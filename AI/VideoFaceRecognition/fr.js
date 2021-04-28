//require("@tensorflow/tfjs-node");
const faceapi = require("face-api.js");
const { workerData } = require("worker_threads");
const { Canvas, Image, ImageData, loadImage } = require("canvas");
faceapi.env.monkeyPatch({ Canvas, Image, ImageData });
const fs = require("fs");
const http = require("https");
const ffmpeg = require("ffmpeg");
const Room = require("../../models/Room");
let start, end;
const { response, roomId, db } = workerData;

const mongoose = require("mongoose");

var download = function (url, dest, cb) {
  var file = fs.createWriteStream(__dirname + dest);
  var request = http
    .get(url, function (response) {
      response.pipe(file);
      file.on("finish", function () {
        file.close(cb); // close() is async, call cb after close completes.
      });
    })
    .on("error", function (err) {
      // Handle errors
      fs.unlink(dest); // Delete the file async. (But we don't check the result)
      console.log(err.message);
    });
};
function process() {
  try {
    new ffmpeg(__dirname + "/video.mp4", function (err, video) {
      if (!err) {
        console.log("The video is ready to be processed");
        video.fnExtractFrameToJPG(
          __dirname + "/tmp",
          {
            every_n_frames: 170,
            file_name: "frame",
          },
          async function (err, files) {
            await DetectFaces(files);
            fs.rmdir(
              __dirname + "/tmp",
              {
                recursive: true,
              },
              (error) => {
                if (error) {
                  console.log(error);
                } else {
                  console.log("Recursive: Directories Deleted!");
                  end = Date.now();
                  const ms = end - start;
                  console.log(Math.floor(ms / 1000), "seconds");
                }
              }
            );
          }
        );
      } else {
        console.log("Error: " + err);
      }
    });
  } catch (e) {
    console.log(e.code);
    console.log(e.msg);
  }
}

async function DetectFaces(files) {
  start = Date.now();

  await faceapi.nets.faceRecognitionNet.loadFromDisk(__dirname + "/models");
  await faceapi.nets.faceLandmark68Net.loadFromDisk(__dirname + "/models");
  await faceapi.nets.ssdMobilenetv1.loadFromDisk(__dirname + "/models");

  const queryImage = await loadImage(__dirname + "/photo.jpg");

  const result = await faceapi
    .detectSingleFace(queryImage)
    .withFaceLandmarks()
    .withFaceDescriptor();

  const labeledDescriptors = [
    new faceapi.LabeledFaceDescriptors("Iheb Rejeb", [result.descriptor]),
  ];
  let obj = { totalFrames: 0, frames: [] };
  const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors);
  await Promise.all(
    files.map(async (file) => {
      const img = await loadImage(file);
      obj.totalFrames++;
      let newFrame = { frame: file.split("_")[1].slice(0, -4), users: [] };
      const res = await faceapi
        .detectAllFaces(img)
        .withFaceLandmarks()
        .withFaceDescriptors();
      res.forEach((fd) => {
        const bestMatch = faceMatcher.findBestMatch(fd.descriptor);
        newFrame.users.push(bestMatch.label);
      });
      obj.frames.push(newFrame);
    })
  );
  console.log(JSON.stringify(obj));
  try {
    mongoose
      .connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
      })
      .then(async () => {
        let room = await Room.findOne({ roomSID: roomId });
        room.stats = obj;
        await room.save();
      });
  } catch (error) {
    console.log(error);
  }
}
download(response.body.redirect_to, "/video.mp4", process);

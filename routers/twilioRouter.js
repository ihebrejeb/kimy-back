//twilio with config
const {
  jwt: { AccessToken },
} = require("twilio");
const { Worker } = require("worker_threads");
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);
const VideoGrant = AccessToken.VideoGrant;
const MAX_ALLOWED_SESSION_DURATION = 14400;
const express = require("express");
const router = express.Router();
const db = process.env.DATABASE;
const Room = require("../models/Room");
router.route("/token").post(function (request, response) {
  const { identity, room } = request.body;
  const token = new AccessToken(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_API_KEY,
    process.env.TWILIO_API_SECRET,
    { ttl: MAX_ALLOWED_SESSION_DURATION }
  );

  // Assign the generated identity to the token.
  token.identity = identity;

  // Grant the access token Twilio Video capabilities.
  const grant = new VideoGrant({ room });
  token.addGrant(grant);

  // Serialize the token to a JWT string.
  response.send(JSON.stringify({ token: token.toJwt() }));
});
router.route("/roomStatus/:id").get(function (request, response) {
  const { id } = request.params;

  client.video
    .rooms(id)
    .fetch()
    .then((room) => {
      response.json(room.status);
    })
    .catch((err) => {
      response.json("off");
    });
});
router.route("/composevideo/:roomId").get(function (request, response) {
  const { roomId } = request.params;

  client.video.compositions
    .create({
      roomSid: roomId,
      audioSources: "*",
      videoLayout: {
        grid: {
          video_sources: ["*"],
        },
      },
      format: "mp4",
    })
    .then((composition) => {
      res.json(composition);
    })
    .catch((err) => {
      res.json(err);
    });
});
router.route("/getVideo/:roomId").get((req, res) => {
  const { roomId } = req.params;
  client.video.compositions
    .list({
      roomSid: roomId,
    })
    .then((compositions) => {
      let link = compositions[0].links.media;
      client
        .request({
          method: "GET",
          uri: link,
        })
        .then((response) => {
          res.send(response);
        })
        .catch((error) => {
          console.log("Error fetching /Media resource " + error);
          res.send(error);
        });
    })
    .catch((err) => {
      res.send(err);
    });
});
router.route("/createStats/:roomId").get((req, res) => {
  const { roomId } = req.params;

  client.video.compositions
    .list({
      roomSid: roomId,
    })
    .then((compositions) => {
      let link = compositions[0].links.media;
      client
        .request({
          method: "GET",
          uri: link,
        })
        .then(async (response) => {
          let worker = new Worker("./ai/videofacerecognition/fr.js", {
            workerData: { response, roomId, db },
          });
          let room = await Room.findOne({ roomSID: roomId });
          room.processing = true;
          await room.save();
          res.send(room);
        })
        .catch((error) => {
          console.log("Error fetching /Media resource " + error);
          res.send(error);
        });
    })
    .catch((err) => {
      res.send(err);
    });
});
module.exports = router;

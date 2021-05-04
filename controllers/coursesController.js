const base = require("./baseController");
const courses = require("../models/coursesModel");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
require("dotenv").config();
const { v4: uuidv4 } = require("uuid");

// exports.getAllcourses = base.getAll(courses) ;
exports.getCourse = base.getOne(courses);

// exports.createCourse = base.createOne(courses);
// exports.deleteCourse = base.deleteOne(courses);
exports.updateCourse = base.updateOne(courses);

exports.deleteCourse = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No course with id: ${id}`);

  await courses.findByIdAndRemove(id);

  res.json({ message: "course deleted successfully." });
};

exports.getAllcourses = async (req, res, next) => {
  try {
    const user = req.user;

    const doc = await courses
      .find({
        $or: [
          {
            creator: user,
          },
          {
            Students: user,
          },
        ],
      })
      .sort({ _id: -1 })
      .populate("creator");

    res.status(200).json({
      status: "success",
      results: doc.length,
      data: doc,
    });
  } catch (error) {
    next(error);
  }
};

exports.createCourse = async (req, res, next) => {
  const user = req.user;

  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "kimyschool2021@gmail.com",
        pass: "kimy2021",
      },
    });

    const doc = await courses.create({ ...req.body, creator: user });
    let mailOptions = {
      from: "kimyschool2021@gmail.com", // TODO: email sender
      to: "mohamedhabib.dridi@esprit.tn", // TODO: email receiver
      subject: "your course secret code",
      text: `the secret code for your course under the namme (${doc.title}) is ==> secret code ${doc.secretCode}`,
    };
    transporter.sendMail(mailOptions, (err, data) => {
      if (err) {
        console.log("Error occurs", err);
      } else console.log("Email sent!!!");
    });
    console.log(doc);
    res.status(201).json({
      status: "success",
      data: doc,
    });
  } catch (error) {
    next(error);
  }
};
exports.enrollStudent = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = req.user;
    const course = await courses.findById(id);
    console.log(course);
    course.Students.push(user);
    await course.save();
    res.status(200).json({
      status: "success",
      data: course,
    });
  } catch (error) {
    next(error);
    // console.log(course)
  }
};

exports.GetCode = async (req, res, next) => {
  try {
    const { search } = req.params;
    const doc = await courses
      .find({
        secretCode: search,
      })
      .populate("creator");
    res.status(200).json(doc);
  } catch (error) {
    next(error);
  }
};

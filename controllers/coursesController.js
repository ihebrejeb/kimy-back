const base = require("./baseController");
const courses = require("../models/CoursesModel");
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
      to: user.email, // TODO: email receiver
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
    const users = req.user;

    const course = await courses.findById(id);

    if (course) {
      const found = await courses.find({ _id: req.params.id, Students: users });
      if (found.length > 0) console.log("enrolled");
      else if (found.length === 0) {
        course.Students.push(users);
        await course.save();
        console.log(course);
        res.status(200).json({
          status: "success",
          data: course,
        });
      }
    }
  } catch (error) {
    next(error);
    // console.log(course)
  }
};

exports.kick = async (req, res, next) => {
  const user = req.user;
  const { id } = req.params;

  const course = await courses.findById(id);
  try {
    if (course) {
      const found = await courses.find({ _id: req.params.id, Students: user });
      if (found.length > 0) {
        const removeindex = course.Students;

        await course.save();
        console.log(course);
        res.status(200).json({
          status: "success",
          data: course,
        });
      } else if (found.length === 0) {
        console.log("no user");
      }
    }
  } catch (error) {
    next(error);
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

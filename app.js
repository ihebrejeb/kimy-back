require("dotenv").config();

const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const bodyParser = require("body-parser");

const globalErrHandler = require("./controllers/errorController");
const AppError = require("./utils/appError");

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});
io.on("connection", (socket) => {
  console.log("User Online");

  socket.on("canvas-data", (data) => {
    socket.broadcast.emit("canvas-data", data);
  });
});

/**
 * import routers here
 */
const chatRouter = require("./routers/chatRouter");
const userRouter = require("./routers/userRouter");
const coursesRouter = require("./routers/coursesRouter");
const coursesActivityRouter = require("./routers/CourseActivityRouter");
const ForumRouter = require("./routers/ForumRouter");
const roomsRouter = require("./routers/roomsRouter");
const twilioRouter = require("./routers/twilioRouter");
const attendanceRouter = require("./routers/attendanceRouter");
const assignmentsRouter = require("./routers/AssignmentRouter");
const livequizzRouter = require("./routers/livequizzRouter");
const { connect } = require("./routers/chatRouter");

/**
 * DB Config
 */
const messages = require("./models/messagesModel");
const Livequiz = require("./models/liveQuizzModel");
const User = require("./models/userModel");

const port = process.env.PORT || 4000;
const db = process.env.DATABASE;

io.on("connection", (socket) => {

  socket.on("message", ({ name, message }) => {
    io.emit("message", { name, message });

    let chatmessage = new messages({ name: name, message: message });
    chatmessage.save();
  });

  socket.on("new live quizz", ({ question, optionOne, optionTwo, optionThree, optionFour, optionFive, optionCorrect }) => {
    let livequiz = new Livequiz({ question: question, optionOne: optionOne, optionTwo: optionTwo, optionThree: optionThree, optionFour: optionFour, optionFive: optionFive, optionCorrect: optionCorrect });
    io.emit("new live quizz", { livequiz });
    livequiz.save();
  });
  
  socket.on("new answer quizz", async({ username, answer, livequi, corect })  =>  {
    const doc = await Livequiz.findOne({_id:livequi._id})
    console.log(doc)
    doc.answer.push({username: username, answervalue: answer, correct: corect})
    await doc.save()
    io.emit("new answer quizz", { doc, corect });
   
  });

  socket.on("find me quizz", async({ id })  =>  {
    const quizz = await Livequiz.findOne({_id:id})
    io.emit("quizz found", { quizz });
   
  });

  socket.on("find me user", async({ email })  =>  {
    console.log(email)
    const user = await User.findOne({
      email,
    });
    console.log(user)
    let mybool= false
    if(user){
      mybool= true
    }
    console.log(mybool)
    io.emit("result of user", { mybool });
   
  });

  socket.on("get quizzs", async()  =>  {
    const quizzs = await Livequiz.find()
    io.emit("return quizzs", { quizzs });
  });
  
  socket.on("finished quizz", ({}) => {
    io.emit("finished quizz", { });
  });
  
});


mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("connected to db");
  });
/**
 * end DB Config
 */

/**
 * configure express app here
 */
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(express.static(path.join(__dirname, "public")));

/**
 * use routers here
 */

app.use("/Activity", coursesActivityRouter);
app.use("/forum", ForumRouter);
app.use("/courses", coursesRouter);
app.use("/user", userRouter);
app.use("/livequizz", livequizzRouter);
app.use("/chat", chatRouter);
app.use("/rooms", roomsRouter);
app.use("/twilio", twilioRouter);
app.use("/attendance", attendanceRouter);
app.use("/assignments", assignmentsRouter);
/**
 *  handle undefined Routes
 */
app.use("*", (req, res, next) => {
  const err = new AppError(404, "fail", "undefined route");
  next(err, req, res, next);
});

app.use(globalErrHandler);

server.listen(port, () => {
  console.log(`server listening at http://localhost:${port}`);
});

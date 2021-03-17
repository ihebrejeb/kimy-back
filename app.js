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
  socket.on("message", ({ name, message }) => {
    io.emit("message", { name, message });
  });
});

/**
 * import routers here
 */
const chatRouter = require("./routers/chatRouter");
const userRouter = require("./routers/userRouter");
const coursesRouter = require("./routers/coursesRouter");
const onlineSessionRouter = require("./routers/onlineSessionRouter");
const twilioRouter = require("./routers/twilioRouter");
/**
 * DB Config
 */
const port = process.env.PORT || 4000;
const db = process.env.DATABASE;

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
app.use("/courses", coursesRouter);
app.use("/user", userRouter);
app.use("/chat", chatRouter);
app.use("/osession", onlineSessionRouter);
app.use("/twilio", twilioRouter);

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

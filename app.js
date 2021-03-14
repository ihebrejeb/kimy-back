require("dotenv").config();

const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
const express = require("express");
const socketio = require("socket.io");
const http = require('http') ; 
const app = express();
const server = http.createServer(app) ; 
 

const globalErrHandler = require("./controllers/errorController");
const AppError = require("./utils/appError");


const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  }
});io.on('connection', socket => {
  socket.on('message', ({ name, message }) => {
    io.emit('message', { name, message })
  })
})


/**
 * import routers here
 */
const chatRouter = require("./routers/chatRouter") ; 
const userRouter = require("./routers/userRouter");

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
 app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

/**
 * use routers here
 */

app.use("/user", userRouter);
app.use ("/chat", chatRouter )

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

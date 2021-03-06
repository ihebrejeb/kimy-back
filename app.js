require("dotenv").config();

const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
const express = require("express");

const app = express();

const globalErrHandler = require("./controllers/errorController");
const AppError = require("./utils/appError");

/**
 * import routers here
 */
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

/**
 *  handle undefined Routes
 */
app.use("*", (req, res, next) => {
  const err = new AppError(404, "fail", "undefined route");
  next(err, req, res, next);
});

app.use(globalErrHandler);

app.listen(port, () => {
  console.log(`server listening at http://localhost:${port}`);
});

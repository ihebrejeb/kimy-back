var express = require("express");
var router = express.Router();

const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

router.post("/login", authController.login);
router.post("/loging", authController.loging);
router.post("/signup", authController.signup);
router.post("/signupg", authController.signupg);
router.post("/updatepassword", authController.updatepassword);
router.post("/updatepass", authController.updatepass);

// Protect all routes after this middleware
router.use(authController.protect);

router.delete("/deleteMe", userController.deleteMe);

router.route("/").get(userController.getAllUsers);

router
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
const router = require("express").Router();
const { checkEmail, checkUsername } = require("../middlewares/authMiddleware");
const {
  signupGetController,
  signupPostController,
} = require("../controllers/signupController");

router.get("/signup", signupGetController);
router.post("/signup", checkUsername, checkEmail, signupPostController);

module.exports = router;

const router = require("express").Router();

const {
  loginGetController,
  loginPostController,
  logoutController,
} = require("../controllers/loginController");

router.get("/login", loginGetController);
router.post("/login", loginPostController);
router.get("/logout", logoutController);

module.exports = router;

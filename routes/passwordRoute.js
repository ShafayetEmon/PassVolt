const router = require("express").Router();

const {
  addpasswordGetController,
  addpasswordPostController,
  passworEditGetController,
  passworEditPostController,
  passwordDeleteController,
  viewAllPassController,
  viewAllPassPageController,
} = require("../controllers/passwordController");
const { checkLoginUser } = require("../middlewares/authMiddleware");

router.get("/addnewPassword", checkLoginUser, addpasswordGetController);
router.post("/addnewPassword", checkLoginUser, addpasswordPostController);

router.get("/edit/:id", checkLoginUser, passworEditGetController);
router.post("/edit/:id", checkLoginUser, passworEditPostController);

router.get("/delete/:id", checkLoginUser, passwordDeleteController);

router.get("/viewallpassword", checkLoginUser, viewAllPassController);
router.get("/viewallpassword/:page", checkLoginUser, viewAllPassPageController);

module.exports = router;

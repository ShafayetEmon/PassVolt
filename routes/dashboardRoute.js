const router = require("express").Router();

const {
  dashboardGetController,
} = require("../controllers/dashboardController");
const { checkLoginUser } = require("../middlewares/authMiddleware");

router.get("/dashboard", checkLoginUser, dashboardGetController);

module.exports = router;

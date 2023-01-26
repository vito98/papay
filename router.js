const express = require("express");
const router = express.Router();
const memberController = require("./controller/memberController");

// memberga aloqador
router.post("/signup", memberController.signup);
router.post("/login", memberController.login);
router.get("/logout", memberController.logout);

// bowqa routerlar
router.get("/menu", function (req, res) {
  res.send("you are in menu page");
});

router.get("/community", function (req, res) {
  res.send("you are in community page");
});

module.exports = router;

const express = require("express");
const router = express.Router();
const memberController = require("./controllers/memberController");

/*********************
 *      REST API     *
 *********************/

// memberga aloqador
router.post("/signup", memberController.signup);
router.post("/login", memberController.login);
router.get("/logout", memberController.logout);
router.get("/check-me", memberController.checkMyAuthentication);

// bowqa routerlar
router.get("/menu", function (req, res) {
  res.send("you are in menu page");
});

router.get("/community", function (req, res) {
  res.send("you are in community page");
});

module.exports = router;

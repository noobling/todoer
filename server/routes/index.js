const express = require("express");
const router = express.Router();
const ctrlUsers = require("../controller/users");

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/info", function(req, res, next) {
  res.render("info");
});

router.post("/register", ctrlUsers.register);

router.post("/login", ctrlUsers.login);

module.exports = router;

const express = require("express");
const router = express.Router();
const ctrlUsers = require("../controller/users");
const ctrlTodoLists = require("../controller/todoLists");

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/info", function(req, res, next) {
  res.render("info");
});

module.exports = router;

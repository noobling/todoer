const express = require("express");
const router = express.Router();
const ctrlUsers = require("../controller/users");
const ctrlTodoLists = require("../controller/todoLists");

router.post("/register", ctrlUsers.register);
router.post("/login", ctrlUsers.login);
router.get("/user", ctrlUsers.show);
router.get("/users", ctrlUsers.index);

router.post("/todoList", ctrlTodoLists.store);
router.get("/todoList/:todoListId", ctrlTodoLists.show);

module.exports = router;

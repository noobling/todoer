const express = require("express");
const router = express.Router();
const ctrlUsers = require("../controller/users");
const ctrlTodoLists = require("../controller/todoLists");
const ctrlTodoItems = require("../controller/todoItems")

router.post("/register", ctrlUsers.register);
router.post("/login", ctrlUsers.login);
router.get("/user", ctrlUsers.show);
router.get("/users", ctrlUsers.index);

router.post("/todoList", ctrlTodoLists.store);
router.get("/todoList/:todoListId", ctrlTodoLists.show);
router.get("/todoList/:todoListId/users", ctrlTodoLists.users);
router.post("/todoList/:todoListId/todoItem/create", ctrlTodoItems.store);

module.exports = router;

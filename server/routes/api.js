const express = require("express");
const router = express.Router();
const ctrlUsers = require("../controller/users");
const auth = require("../controller/auth");
const ctrlTodoLists = require("../controller/todoLists");
const ctrlTodoItems = require("../controller/todoItems");

router.post("/register", auth.register);
router.post("/login", auth.login);
router.get("/logout", auth.logout);

router.get("/users", ctrlUsers.index);
router.get("/loggedInUser", ctrlUsers.loggedInUser);
router.get("/user/todoLists", ctrlUsers.userTodoLists);
router.get("/user/:userId", ctrlUsers.show);
router.get("/user/:userId/todoLists", ctrlUsers.todoLists);

router.post("/todoList", ctrlTodoLists.store);
router.get("/todoList/:todoListId", ctrlTodoLists.show);
router.get("/todoList/:todoListId/users", ctrlTodoLists.users);
router.delete("/todoList/:todoListId", ctrlTodoLists.destroy);

router.post("/todoList/:todoListId/todoItem/create", ctrlTodoItems.store);
router.get("/todoList/:todoListId/todoItems", ctrlTodoItems.index);

module.exports = router;

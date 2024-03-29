const express = require("express");
const router = express.Router();
const ctrlUsers = require("../controller/users");
const auth = require("../controller/auth");
const ctrlTodoLists = require("../controller/todoLists");
const ctrlTodoItems = require("../controller/todoItems");
const ctrlTodoItemsChat = require("../controller/todoItemsChat");
const ctrlNotifications = require("../controller/notifications");

router.post("/register", auth.register);
router.post("/login", auth.login);
router.get("/logout", auth.logout);

router.get("/users", ctrlUsers.index);
router.get("/loggedInUser", ctrlUsers.loggedInUser);
router.get("/user/todoLists", ctrlUsers.userTodoLists);
router.get("/user/:userId", ctrlUsers.show);
router.get("/user/:userId/todoLists", ctrlUsers.todoLists);
router.put("/user", ctrlUsers.update);

router.post("/todoList", ctrlTodoLists.store);
router.get("/todoLists", ctrlTodoLists.index);
router.get("/todoList/:todoListId", ctrlTodoLists.show);
router.post("/todoList/:todoListId/join", ctrlTodoLists.join);
router.get("/todoList/:todoListId/users", ctrlTodoLists.users);
router.delete("/todoList/:todoListId", ctrlTodoLists.destroy);
router.put("/todoList/:todoListId", ctrlTodoLists.update);

router.post("/todoList/:todoListId/todoItem/create", ctrlTodoItems.store);
router.get("/todoList/:todoListId/todoItems", ctrlTodoItems.index);
router.post("/todoItem/:todoItemId/complete", ctrlTodoItems.complete);
router.post("/todoItem/:todoItemId/uncomplete", ctrlTodoItems.uncomplete);
router.delete("/todoItem/:todoListId/:todoItemId", ctrlTodoItems.delete);
router.put("/todoItem/:todoItemId", ctrlTodoItems.update);

router.post("/todoItem/:todoItemId/chat", ctrlTodoItemsChat.store);
router.get("/todoItem/:todoItemId/messages", ctrlTodoItemsChat.index);
router.delete("/message/:messageId", ctrlTodoItemsChat.destroy);

router.post('/notification/:notificationId/read', ctrlNotifications.read)
router.get('/notifications', ctrlNotifications.index)

module.exports = router;

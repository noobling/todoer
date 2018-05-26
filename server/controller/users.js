const User = require("../models/user");
const passport = require("passport");
const TodoList = require("../models/todoList");


module.exports.loggedInUser = (req, res) => {
  res.json(req.user);
};

module.exports.index = (req, res) => {
  User.find({}, (err, users) => {
    res.json(users);
  });
};

module.exports.show = (req, res) => {
  User.findById(req.params.userId, "email name", (err, user) => {
    res.json(user);
  });
};

module.exports.todoLists = (req, res) => {
  TodoList.find({ owner: req.params.userId }, (err, todoLists) => {
    res.json(todoLists);
  });
};

module.exports.userTodoLists = (req, res) => {
  TodoList.find({ $or: [{owner: req.user.id}, {participants: req.user.id}] }, (err, todoLists) =>
    res.json(todoLists)
  );
};



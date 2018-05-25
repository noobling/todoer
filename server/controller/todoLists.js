const TodoList = require("../models/todoList");
const User = require("../models/user");
const TodoItem = require("../models/todoItem");
const mongoose = require("mongoose");

module.exports.store = (req, res) => {
  if (!req.user) {
    res
      .status(401)
      .json({ message: "You don't have the authorization to do this action" });
  }

  const todoList = new TodoList();

  todoList.name = req.body.name;
  todoList.description = req.body.description;
  todoList.skills = req.body.skills;
  todoList.owner = req.user.id;
  todoList.participants = req.body.participants;

  todoList
    .save()
    .then(newTodoList => {
      res.json(newTodoList);
    })
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
};

module.exports.show = (req, res) => {
  TodoList.findById(req.params.todoListId, (err, todoList) => {
    if (err) {
      console.log(err);
      res.status(400).json(err);
    } else {
      res.json(todoList);
    }
  });
};

module.exports.users = (req, res) => {
  TodoList.findById(req.params.todoListId, (err, todoList) => {
    if (err) res.status(400).json(err);
    else {
      User.find(
        {
          _id: {
            $in: todoList.participants
          }
        },
        function(err, docs) {
          res.json(docs);
        }
      );
    }
  });
};

module.exports.destroy = (req, res) => {
  const todoListIdToDel = req.params.todoListId;

  TodoItem.deleteMany({ todoList: todoListIdToDel }, err => console.log(err))

  TodoList.deleteOne({ _id: todoListIdToDel }, err => console.log(err));

  res.json("TodoListDeleted");
};

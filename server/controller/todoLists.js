const TodoList = require("../models/todoList");
const User = require("../models/user");
const TodoItem = require("../models/todoItem");
const mongoose = require("mongoose");
const ctrlNotifications = require('./notifications')

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
      console.log(err)
      res.status(400).json(err);
    });
};

module.exports.show = (req, res) => {
  TodoList.findById(req.params.todoListId, (err, todoList) => {
    if (err) {
    } else {
      res.json(todoList);
    }
  })
  .catch(err => {
    res.status(400).json(err)
  })
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

  TodoItem.deleteMany({ todoList: todoListIdToDel }, err => {
    if (err) {
      console.log(err)
    }
  });

  TodoList.deleteOne({ _id: todoListIdToDel }, err => {
    if (err) {
      console.log(err)
    }
  });
  res.json("TodoListDeleted");      
};

module.exports.index = (req, res) => {
  TodoList.find({}, (err, todoLists) => res.json(todoLists));
};

module.exports.join = (req, res) => {
  if (!req.user) return res.status(401).json({ message: "Unauthorized" });

  TodoList.findOne({ _id: req.params.todoListId }).then(result => {
    result.participants.push(req.user.id);
    result.save()
      .then(() => {
        res.json({ message: "Todo List Joined" });
        result.participants.forEach((participant) => {
          if (req.user.id != participant) {
            ctrlNotifications.store({
              forUser: participant,
              route: '/todoList/' + req.params.todoListId,
              message: req.user.name + ' has joined ' + result.name
            })
          }
        })
      })
  });
};

module.exports.update = (req, res) => {
  TodoList.update({ _id: req.params.todoListId }, req.body).then(() => {
    res.json("Updated Todo List");
  })
  .catch(err => {
    res.status(400).json(err)
  })
};

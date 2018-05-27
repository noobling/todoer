const TodoItem = require("../models/todoItem");
const TodoList = require("../models/todoList");
const User = require("../models/user");

module.exports.store = (req, res) => {
  // if (!req.user) {
  //   res.status(401).json({ message: "Authorization error" });
  // }

  const todoItem = new TodoItem();
  todoItem.name = req.body.name;
  todoItem.description = req.body.description;
  todoItem.skills = req.body.skills;
  todoItem.todoList = req.params.todoListId;
  //todoItem.creator = req.user.id;
  todoItem.dueDate = req.body.dueDate;
  if (req.body.autoAssign === true) {
    findMostSuitableUser(
      req.params.todoListId,
      req.body.skills,
      suitableUser => {
        todoItem.participants = suitableUser;
        saveTodoItem(todoItem, req, res);
      }
    );
  } else {
    todoItem.participants = req.body.participants;
    saveTodoItem(todoItem, req, res);
  }
};

module.exports.index = (req, res) => {
  TodoList.findById(req.params.todoListId).then(todoList => {
    TodoItem.find({
      _id: {
        $in: todoList.todoItems
      }
    }).then(todoItems => res.json(todoItems));
  });
};

module.exports.complete = (req, res) => {
  TodoItem.update(
    { _id: req.params.todoItemId },
    { $set: { completed: true } },
    (err, result) => {
      res.json({ message: "Set todo to complete" });
    }
  );
};

module.exports.uncomplete = (req, res) => {
  TodoItem.update(
    { _id: req.params.todoItemId },
    { $set: { completed: false } },
    (err, result) => {
      res.json({ message: "Set completed to false" });
    }
  );
};

module.exports.delete = (req, res) => {
  TodoList.update(
    { _id: req.params.todoListId },
    { $pull: req.params.todoItemId }
  ).then(() => {});

  TodoItem.deleteOne({_id: req.params.todoItemId}, err => res.json('Delete todo item'))
};

function saveTodoItem(todoItem, req, res) {
  todoItem
    .save()
    .then(newTodoItem => {
      TodoList.findOne({ _id: req.params.todoListId }).then(result => {
        result.todoItems.push(newTodoItem._id);
        result.save();
        res.json(newTodoItem);
      });
    })
    .catch(err => {
      res.status(400).json(err);
    });
}

function findMostSuitableUser(todoListId, skills, cb) {
  let numSkillsMatched = 0;
  let suitableUser = null;
  TodoList.findById(todoListId, (err, todoList) => {
    User.find(
      {
        _id: {
          $in: todoList.participants
        }
      },
      (err, users) => {
        users.forEach(user => {
          let matchedSkills = 0;
          user.skills.forEach(skill => {
            if (skills.indexOf(skill) !== -1) matchedSkills++;
          });
          if (matchedSkills >= numSkillsMatched) {
            suitableUser = user._id;
            numSkillsMatched = matchedSkills;
          }
        });

        cb([suitableUser]);
      }
    );
  });
}

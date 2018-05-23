const TodoItem = require("../models/todoItem");
const TodoList = require("../models/todoList");

module.exports.store = (req, res) => {
  if (!req.user) {
    res.status(401).json({ message: "Authorization error" });
  }

  const todoItem = new TodoItem();
  todoItem.name = req.body.name;
  todoItem.description = req.body.description;
  todoItem.skills = req.body.skills;
  todoItem.creator = req.user.id;
  todoItem.dueDate = req.body.dueDate;
  if (req.body.autoAssign === "true") {
    todoItem.participants = findMostSuitableUser(
      req.params.todoListId,
      req.body.skills
    );
  } else {
    todoItem.participants = req.body.participants;
  }
  todoItem.todoList = req.params.todoListId;

  todoItem
    .save()
    .then(newTodoItem => {
      TodoList.findOneAndUpdate(
        { _id: req.params.todoListId },
        { $addToSet: newTodoItem._id }
      );
      res.json(newTodoItem);
    })
    .catch(err => {
      res.status(400).json(err);
    });
};

function findMostSuitableUser(todoListId, skills) {
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
          let matchedSkills = 0
          user.skills.forEach(skill => {
            if (skills.indexOf(skill) !== -1) matchedSkills++;
          });
          if (matchedSkills >= numSkillsMatched) {
            suitableUser = user._id
            numSkillsMatched = matchedSkills
          }
        });
        return users
      }
    );
  });
}

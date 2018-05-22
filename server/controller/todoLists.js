const TodoList = require("../models/todoList");

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
      res.status(400).json(err)
    } else {
      res.json(todoList)
    }
  });
};

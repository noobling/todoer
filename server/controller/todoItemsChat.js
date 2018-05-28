const TodoItemChat = require("../models/todoItemChat");

module.exports.store = (req, res) => {
  const todoItemChat = new TodoItemChat();
  todoItemChat.message = req.body.message;
  todoItemChat.user = req.user.id;
  todoItemChat.todoItem = req.params.todoItemId;

  todoItemChat.save().then(newTodoItemChat => {
    res.json(newTodoItemChat);
  });
};

module.exports.index = (req, res) => {
  TodoItemChat.find({ todoItem: req.params.todoItemId }, (err, messages) => {
    res.json(messages);
  });
};

module.exports.destroy = (req, res) => {
  TodoItemChat.deleteOne({ _id: req.params.messageId }, err =>
    res.json("Deleted Message")
  );
};

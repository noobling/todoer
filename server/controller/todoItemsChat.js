const TodoItemChat = require("../models/todoItemChat");
const Pusher = require("pusher");

const pusher = new Pusher({
  appId: "533304",
  key: "779f9709b78f6c1b0f60",
  secret: "a57fc77fa89e3e8a7a0f",
  cluster: "ap1",
  encrypted: true
});

module.exports.store = (req, res) => {
  const todoItemChat = new TodoItemChat();
  todoItemChat.message = req.body.message;
  todoItemChat.user = req.user.id;
  todoItemChat.todoItem = req.params.todoItemId;

  todoItemChat.save().then(newTodoItemChat => {
    pusher.trigger(req.params.todoItemId, "new-message", newTodoItemChat);

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

const mongoose = require("mongoose");

let TodoItemChatSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true
  },
  todoItem: {
    type: mongoose.Schema.ObjectId,
    required: true
  },
  user: {
    type: mongoose.Schema.ObjectId,
    required: true
  },
  dateTime: {
    type: Date,
    default: Date.now
  }
});

let TodoItemChat = mongoose.model("TodoItemChat", TodoItemChatSchema);

module.exports = TodoItemChat;

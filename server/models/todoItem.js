const mongoose = require("mongoose");

let TodoItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  participants: {
    type: [mongoose.Schema.ObjectId],
  },
  skills: {
    type: [String]
  },
  dueDate: {
    type: Date
  },
  creator: {
    type: mongoose.Schema.ObjectId
  },
  todoList: {
    type: mongoose.Schema.ObjectId
  }
});

let TodoItem = mongoose.model("TodoItem", TodoItemSchema);

module.exports = TodoItem;

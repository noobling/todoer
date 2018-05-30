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
    required: true
  },
  skills: {
    type: [String]
  },
  dueDate: {
    type: Date,
    required: true
  },
  creator: {
    type: mongoose.Schema.ObjectId
  },
  todoList: {
    type: mongoose.Schema.ObjectId,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  }
});

let TodoItem = mongoose.model("TodoItem", TodoItemSchema);

module.exports = TodoItem;

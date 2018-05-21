let mongoose = require("mongoose");

let TodoListSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  skills: {
    type: [String],
    required: true
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    required: true
  },
  todoItems: {
    type: [mongoose.Schema.ObjectId]
  }
});

let TodoList = mongoose.model("TodoList", TodoListSchema);

module.exports = TodoList;

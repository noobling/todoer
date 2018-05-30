process.env.NODE_ENV = "test";

const server = require("../app");
const User = require("../models/user");
const TodoList = require("../models/todoList");
const TodoItem = require("../models/todoItem");
const chai = require("chai");
const request = require("supertest");
const should = chai.should();

describe("todo item test", () => {
  describe("PUT /todoItem", () => {
    it("should get the give todo item", done => {
      const todoItem = new TodoItem();
      todoItem.name = "Todo item name";
      todoItem.description = "Todo item description";
      todoItem.participants = ["5b0e3df2cb2d6e41407ea015"];
      todoItem.todoList = "5b0e3df2cb2d6e41407ea015";
      todoItem.creator = "5b0e3df2cb2d6e41407ea015";
      todoItem.dueDate = "2018-05-05";
      todoItem.save().then(newTodoItem => {
        request
          .agent(server)
          .put("/api/todoItem/" + newTodoItem._id)
          .send({ name: "new todo name" })
          .end((err, res) => {
            TodoItem.findById(newTodoItem._id).then(todoItemFound => {
              todoItemFound.name.should.equal("new todo name");
              res.status.should.equal(200);
              TodoItem.collection.drop();
              done();
            });
          });
      });
    });
  });
});

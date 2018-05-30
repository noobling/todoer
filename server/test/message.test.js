process.env.NODE_ENV = "test";

const server = require("../app");
const User = require("../models/user");
const TodoList = require("../models/todoList");
const TodoItem = require("../models/todoItem");
const chai = require("chai");
const request = require("supertest");
const should = chai.should();

describe("message test", () => {
  describe("POST /message", () => {
    it("should be able to create new message", done => {
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
          .post("/api/register")
          .send({
            email: "a@k.com",
            name: "jack wang1",
            password: "password",
            skills: ["fwe", "skill"]
          })
          .end((err, res) => {
            [cookie] = res.headers["set-cookie"].pop().split(";");
            id = res.body._id;
            req = request
              .agent(server)
              .post("/api/todoItem/" + newTodoItem._id + "/chat");
            req.cookies = cookie;
            req.send({ message: "hello" }).end((err, res) => {
              User.collection.drop()
              res.body.message.should.equal('hello')
              res.status.should.equal(200);
              done()
            });
          });
      });
    });
  });
});

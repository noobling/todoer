process.env.NODE_ENV = "test";

const server = require("../app");
const User = require("../models/user");
const TodoList = require("../models/todoList");
const chai = require("chai");
const request = require("supertest");
const should = chai.should();

describe("todolist", () => {
  describe("POST /todolist", () => {
    let cookie = null;
    let id = null;
    it("should create todolist with correct values", done => {
      request
        .agent(server)
        .post("/api/register")
        .send({
          email: "a@b.com",
          name: "jack wang1",
          password: "password",
          skills: ["fwe", "skill"]
        })
        .end((err, res) => {
          [cookie] = res.headers["set-cookie"].pop().split(";");
          id = res.body._id;
          let req = request.agent(server).post("/api/todoList");
          req.cookies = cookie;
          req
            .send({
              name: "Todo list name",
              description: "todo list descripton",
              participants: [id],
              skills: ["Skill1", "Skill2"]
            })
            .end((err, res) => {
              //User.collection.drop();
              res.status.should.equal(200);
              done();
            });
        });
    });
  });

  describe("GET /todolist", () => {
    it("should retrieve todo list", done => {
      const todoList = new TodoList();
      todoList.name = "todo list name";
      todoList.description = "todo list description";
      todoList.skills = ["skill1", "skill2"];
      todoList.participants = ["5b0e3df2cb2d6e41407ea015"];
      todoList.owner = "5b0e3df2cb2d6e41407ea015";
      todoList.save().then(newTodoList => {
        request
          .agent(server)
          .get("/api/todoList/" + newTodoList._id)
          .end((err, res) => {
            TodoList.collection.drop();
            res.status.should.equal(200);
            done();
          });
      });
    });
  });

  describe("PUT /todolist", () => {
    it("should delete todo list", done => {
      const todoList = new TodoList();
      todoList.name = "new name";
      todoList.description = "todo list description";
      todoList.skills = ["skill1", "skill2"];
      todoList.participants = ["5b0e3df2cb2d6e41407ea015"];
      todoList.owner = "5b0e3df2cb2d6e41407ea015";
      todoList.save().then(newTodoList => {
        request
          .agent(server)
          .put("/api/todoList/" + newTodoList._id)
          .send({name: 'change name'})
          .end((err, res) => {
            TodoList.collection.drop();
            res.status.should.equal(200);
            done();
          });
      });
    });
  });
});

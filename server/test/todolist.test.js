process.env.NODE_ENV = "test";

const server = require("../app");
const User = require("../models/user");
const TodoList = require("../models/todoList");
const chai = require("chai");
const request = require("supertest");
const should = chai.should();
describe("todolist", () => {
  beforeEach(done => {
    done();
  });

  afterEach(done => {
    done();
  });
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
          password: "asd123",
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
              User.collection.drop();
              TodoList.collection.drop();
              res.status.should.equal(200);
              done();
            });
        });
    });
  });
});

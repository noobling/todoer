process.env.NODE_ENV = "test";

const server = require("../app");
const User = require("../models/user");
const chai = require("chai");
const request = require("supertest");
const should = chai.should();

describe("user", () => {
  describe("GET /loggedInUser", () => {
    let cookie = null;
    let id = null;
    it("should fetch the current session user", done => {
      request
        .agent(server)
        .post("/api/register")
        .send({
          email: "a@c.com",
          name: "jack wang1",
          password: "password",
          skills: ["fwe", "skill"]
        })
        .end((err, res) => {
          [cookie] = res.headers["set-cookie"].pop().split(";");
          id = res.body._id;
          let req = request.agent(server).get("/api/loggedInUser");
          req.cookies = cookie;
          req.end((err, res) => {
            User.collection.drop();
            res.status.should.equal(200);
            res.body.email.should.equal("a@c.com");
            done();
          });
        });
    });
  });

  describe("GET /user", () => {
    let cookie = null;
    let id = null;
    it("should find the given user from", done => {
      request
        .agent(server)
        .post("/api/register")
        .send({
          email: "a@d.com",
          name: "jack wang1",
          password: "password",
          skills: ["fwe", "skill"]
        })
        .end((err, res) => {
          [cookie] = res.headers["set-cookie"].pop().split(";");
          id = res.body._id;
          let req = request.agent(server).get("/api/user/" + id);
          req.cookies = cookie;
          req.end((err, res) => {
            User.collection.drop();
            res.status.should.equal(200);
            res.body.email.should.equal("a@d.com");
            done();
          });
        });
    });
  });

  describe("PUT /user", () => {
    let cookie = null;
    let id = null;
    it("should be able to update user", done => {
      request
        .agent(server)
        .post("/api/register")
        .send({
          email: "a@e.com",
          name: "jack wang1",
          password: "password",
          skills: ["fwe", "skill"]
        })
        .end((err, res) => {
          [cookie] = res.headers["set-cookie"].pop().split(";");
          id = res.body._id;
          let req = request.agent(server).put("/api/user");
          req.cookies = cookie;
          req.send({name: 'new name'})
            .end((err, res) => {
              User.findById(id).then((user) => {
                user.name.should.equal('new name')
                res.status.should.equal(200);       
                User.collection.drop();         
                done();                                
              })
          });
        });
    });
  });
});

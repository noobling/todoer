process.env.NODE_ENV = "test";

const server = require("../app");
const User = require("../models/user");
const chai = require("chai");
const request = require("supertest");
const should = chai.should();

describe("authentication", () => {
  describe("POST /register", () => {
    const user = {
      email: "test@test.com",
      name: "Jack Wang",
      password: "Strongpass",
      skills: ["Programmer", "Web developer"]
    };
    it("should register successfully with valid data", done => {
      request
        .agent(server)
        .post("/api/register")
        .send(user)
        .end((err, res) => {
          should.not.exist(err);
          res.status.should.equal(200);
          should.exist(res.body._id);
          done();
        });
    });
  });

  describe("POST /login", () => {
    request
      .agent(server)
      .post("/api/register")
      .send({
        email: "a@a.com",
        name: "jack wang",
        password: "asd123",
        skills: ["fwe", "skill"]
			})
			.end((err, res) => {
				it("should login successfully with correct credentials", done => {
					request
						.agent(server)
						.post("/api/login")
						.send({ email: "a@a.com", password: "asd123" })
						.end((err, res) => {
							res.status.should.equal(200);
							User.collection.drop()												
							done()
						});
				});
			})
   
    it("should not login in with incorrect credentials", done => {
      request
        .agent(server)
        .post("/api/login")
        .send({ email: "wrongemail@email.com", password: "badpass" })
        .end((err, res) => {
          res.status.should.equal(400);
          User.collection.drop()
					done()
        });
		});
  });
});

process.env.NODE_ENV = "test";

const server = require("../app");
const User = require("../models/user");
const chai = require("chai");
const request = require("supertest");
const should = chai.should();

describe("todolist", () => {
	describe('POST /todolist', () => {
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
			it("should create todolist with correct credentials", done => {
				request
					.agent(server)
					.post("/todlist")
					.send({ 
						name: 'Todo list name',
						description: 'todo list descripton',
						participants: [res.body._id],
						skills: ['Skill1', 'Skill2']
					})
					.end((err, res) => {
						res.status.should.equal(200);
						done()
						User.collection.drop()
					});
			});
		})
	})
})
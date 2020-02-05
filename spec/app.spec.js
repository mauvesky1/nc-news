process.env.NODE_ENV = "test";

const chai = require("chai");
const { expect } = chai;
const request = require("supertest");
const app = require("../app");
const connection = require("../db/connection");

after(() => {
  connection.destroy();
});

describe("/api", () => {
  beforeEach(() => {
    return connection.seed.run();
  });
  describe("/topics", () => {
    describe("GET", () => {
      it("GET 200: responds with 200 and all topics", () => {
        return request(app)
          .get("/api/topics")
          .expect(200)
          .then(({ body }) => {
            const topics = body.topics;
            expect(topics[0]).to.have.keys("slug", "description");
          });
      });
    });
  });
  describe("/users/butter_bridge", () => {
    describe("GET", () => {
      it("GET 200: responds with 200 and the user supplied", () => {
        return request(app)
          .get("/api/users/butter_bridge")
          .then(({ body }) => {
            const user = body.user;
            // console.log(user);
            expect(user).to.have.keys("username", "avatar_url", "name");
          });
      });
      it("Throws a 404 not found when the user supplied doesn't exist", () => {
        return request(app)
          .get("/api/users/0")
          .then(body => {
            console.log(body.text);
            expect(body.statusCode).to.equal(404);
            //expect(body.text).to.eql({ msg: "User not found, check input" });
          });
      });
    });
  });
  describe("/articles/:article_id", () => {
    return request(app)
      .get("/api/articles/:article_id")
      .then(body => {
        console.log("operational");
      });
  });
});

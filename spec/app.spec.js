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
            //console.log(body, "this is the body");
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

            expect(user).to.have.keys("username", "avatar_url", "name");
          });
      });
      it("Throws a 404 not found when the user supplied doesn't exist", () => {
        return request(app)
          .get("/api/users/0")
          .expect(404)
          .then(({ body }) => {
            console.log(body.msg, "this is the body");
            // expect(body.statusCode).to.equal(404);
            expect(body.msg).to.equal("User not found, check input");
          });
      });
    });
  });
  describe("/articles/:article_id", () => {
    describe("GET", () => {
      it("Returns to the user an article selected by the parameter", () => {
        return request(app)
          .get("/api/articles/1")
          .expect(200)
          .then(({ body }) => {
            //expect(body.user).to.equal(1);
            expect(body.user).to.have.keys(
              "author",
              "article_id",
              "body",
              "created_at",
              "title",
              "topic",
              "votes"
            );
          });
      });
      it("Throws a 404 not found when the user supplied doesn't exist", () => {
        return request(app)
          .get("/api/articles/99")
          .expect(404)
          .then(({ body }) => {
            // console.log(body);
            expect(body.msg).to.equal("Not found");
          });
      });
    });
  });
});

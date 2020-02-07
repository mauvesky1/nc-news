process.env.NODE_ENV = "test";

const chai = require("chai");
const { expect } = chai;
const chaiSorted = require("sams-chai-sorted");
const request = require("supertest");
const app = require("../app");
const connection = require("../db/connection");

chai.use(chaiSorted);

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

            expect(user).to.have.keys("username", "avatar_url", "name");
          });
      });
      it("Throws a 404 not found when the user supplied doesn't exist", () => {
        return request(app)
          .get("/api/users/0")
          .expect(404)
          .then(({ body }) => {
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
            expect(body.user).to.have.keys(
              "author",
              "article_id",
              "body",
              "created_at",
              "title",
              "topic",
              "votes",
              "comment_count"
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
      it("Throws a bad request when the user inputs anything other than a number", () => {
        return request(app)
          .get("/api/articles/naughtydog")
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).to.equal("URL string incorrect");
          });
      });
    });
    describe("PATCH", () => {
      it("Adds to the articles' vote total", () => {
        return request(app)
          .patch("/api/articles/1")
          .send({ votes: 22 })
          .expect(200)
          .then(({ body }) => {
            expect(body.article.votes).to.equal(122);
          });
      });
      it("Respond with a 404 not found when requesting a non-existent article", () => {
        return request(app)
          .patch("/api/articles/99")
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).to.equal("Not found");
          });
      });
      it("Respond with a 400 bad request when the request is not a number", () => {
        return request(app)
          .patch("/api/articles/prism")
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).to.equal("URL string incorrect");
          });
      });
    });
  });

  describe("/api/articles/:article_id/comments", () => {
    describe("POST", () => {
      it("Posts a comment to the database and also returns that comment", () => {
        return request(app)
          .post("/api/articles/1/comments")
          .send({ username: "username33", body: "MITCHTHEMAN" })
          .expect(201)
          .then(({ body }) => {
            expect(body.comment[0]).to.have.keys(
              "comment_id",
              "author",
              "votes",
              "article_id",
              "body",
              "created_at"
            );
          });
      });
    });
    describe("GET", () => {
      it("Responds with an array of comments for the given article Id", () => {
        return request(app)
          .get("/api/articles/5/comments")
          .expect(200)
          .then(({ body }) => {
            expect(body.comments.length).to.equal(2);
          });
      });
      it("Responds with a 404", () => {
        return request(app)
          .get("/api/articles/99/comments")
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).to.equal("404 not found here!");
          });
      });
      it("Responds with an 400", () => {
        return request(app)
          .get("/api/articles/thisisnotanumber/comments")
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).to.equal("URL string incorrect");
          });
      });
    });
  });
  describe("/api/articles/", () => {
    describe("GET", () => {
      it("Responds with an array of article objects", () => {
        return request(app)
          .get("/api/articles")
          .expect(200)
          .then(({ body }) => {
            expect(body.articles[0]).to.have.keys(
              "title",
              "article_id",
              "author",
              "body",
              "created_at",
              "topic",
              "votes",
              "comment_count"
            );
          });
      });
      it("The default response is a list sorted by created_at", () => {
        return request(app)
          .get("/api/articles")
          .expect(200)
          .then(({ body }) => {
            expect(body.articles).to.be.sortedBy("created_at");
          });
      });
      it("The response can be sorted by title", () => {
        return request(app)
          .get("/api/articles?order=desc")
          .expect(200)
          .then(({ body }) => {
            console.log(body);
            expect(body.articles).to.be.sortedBy("created_at", {
              descending: true
            });
          });
      });
    });
  });
});

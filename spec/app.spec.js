// process.env.Node_env = "test";

const chai = require("chai");
const { expect } = chai;
const request = require("supertest");
const app = require("../app");
const connection = require("../db/connection");

after(() => {
  connection.destroy();
});

// beforeEach

describe("/api", () => {
  describe("/topics", () => {
    describe("GET", () => {
      it('"GET 200: responds with 200 and all topics', () => {
        return request(app)
          .get("/api/topics")
          .expect(200)
          .then(({ body }) => {
            expect(body).to.have.keys("slug");
          });
      });
    });
  });
});

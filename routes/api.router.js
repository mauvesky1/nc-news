const api_router = require("express").Router();
const topics_router = require("./topics.router");
const users_router = require("./users.router");
const article_router = require("./article.router");
const comments_router = require("./comments.router");
const error_handler = require("../error-handlers/error.handlers");

api_router.use("/topics", topics_router);
api_router.use("/users", users_router);
api_router.use("/articles", article_router);
api_router.use("/comments", comments_router);
api_router.all("/*", (req, res, next) => {
  res.status(405).send({ msg: "Not Allowed" });
});
module.exports = api_router;

// send back an empty string
// invoke first function first, if 0, then do the checkExists

// abolish the countBy

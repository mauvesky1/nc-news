const api_router = require("express").Router();
const topics_router = require("./topics.router");
const users_router = require("./users.router");
const article_router = require("./article.router");
const comments_router = require("./comments.router");

api_router.use("/topics", topics_router);
api_router.use("/users", users_router);
api_router.use("/articles", article_router);
api_router.use("/comments", comments_router);

module.exports = api_router;

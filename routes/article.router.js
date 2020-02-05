const articles_router = require("express").Router();
const { getArticle } = require("../controllers/articles.controller");

articles_router.route("/:article").get(getArticle);

module.exports = articles_router;

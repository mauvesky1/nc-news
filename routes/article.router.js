const articles_router = require("express").Router();
const { getArticle } = require("../controllers/articles.controller");

articles_router.route("/:article_id").get(getArticle);

module.exports = articles_router;

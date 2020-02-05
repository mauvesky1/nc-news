const articles_router = require("express").Router();
const {
  getArticle,
  patchArticle
} = require("../controllers/articles.controller");

articles_router
  .route("/:article_id")
  .get(getArticle)
  .patch(patchArticle);

module.exports = articles_router;

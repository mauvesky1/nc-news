const articles_router = require("express").Router();
const {
  getArticle,
  patchArticle
} = require("../controllers/articles.controller");

const {
  postComment,
  getComments
} = require("../controllers/comments.controller");
articles_router
  .route("/:article_id")
  .get(getArticle)
  .patch(patchArticle);
//GET /api/articles/:article_id/comments
articles_router.route("/:article_id/comments").post(postComment);
//.get(getComments);

module.exports = articles_router;

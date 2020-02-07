const comments_router = require("express").Router();
const {
  patchComments,
  deleteComment
} = require("../controllers/comments.controller");

comments_router
  .route("/:comment_id")
  .patch(patchComments)
  .delete(deleteComment)
  .all();

module.exports = comments_router;

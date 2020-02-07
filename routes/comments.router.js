const comments_router = require("express").Router();
const {
  patchComments
} = require("../controllers/comments.controller").Router();

comments_router.route("/:comment_id").patch(patchComments);
module.exports = comments_router;

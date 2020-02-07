const comments_router = require("express").Router();
const { patchComments } = require("../controllers/comments.controller");

comments_router.route("/:comment_id").patch(patchComments);

module.exports = comments_router;

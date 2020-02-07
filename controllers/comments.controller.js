const {
  insertComment,
  fetchComments,
  patchComment
} = require("../models/comments.models");
const { renameKey } = require("../db/utils/utils");

exports.postComment = (req, res, next) => {
  const { article_id } = req.params;
  const body = req.body;
  body.author = body.username;
  delete body.username;

  body.article_id = article_id;
  insertComment(body).then(commentData => {
    console.log("in the controller");
    res.status(201).send({ comment: commentData });
  });
};

exports.getComments = (req, res, next) => {
  const article_id = req.params;

  fetchComments(article_id)
    .then(comments => {
      if (comments.length === 0) {
        return Promise.reject({ msg: "Not really found" });
      }
      res.status(200).send({ comments: comments });
    })
    .catch(err => {
      next(err);
    });
};

exports.patchComments = (req, res, next) => {
  console.log(req);
  console.log("controller");
  patchComment();
  //  patchComment(comment_id)
};

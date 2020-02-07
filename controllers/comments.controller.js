const {
  insertComment,
  fetchComments,
  patchComment,
  deleteComment
} = require("../models/comments.models");
const { renameKey } = require("../db/utils/utils");

exports.postComment = (req, res, next) => {
  const { article_id } = req.params;
  const body = req.body;
  body.author = body.username;
  delete body.username;

  body.article_id = article_id;
  insertComment(body).then(commentData => {
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
  const { inc_votes } = req.body;
  const { comment_id } = req.params;

  patchComment(inc_votes, comment_id).then(result => {
    res.send({ comment: result });
  });
  //  patchComment(comment_id)
};

exports.deleteComment = (req, res, next) => {
  const { comment_id } = req.params;
  console.log(comment_id);
  deleteComment(comment_id).then(result => {
    if (result === 1) {
      res.status(204).send();
    } else {
      Promise.reject({ status: 404, msg: "Not found" });
    }
  });
};

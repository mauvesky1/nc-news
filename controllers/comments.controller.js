const { insertComment, fetchComments } = require("../models/comments.models");
const { renameKey } = require("../db/utils/utils");

exports.postComment = (req, res, next) => {
  const { article_id } = req.params;
  const body = req.body;

  body.created_by = body.username;
  delete body.username;
  //body.created_at = new Date.time();
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

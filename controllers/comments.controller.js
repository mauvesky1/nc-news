const { insertComment, fetchComments } = require("../models/comments.models");
const { renameKey } = require("../db/utils/utils");

exports.postComment = (req, res, next) => {
  const { article_id } = req.params;
  const body = req.body;

  body.created_by = body.username;
  delete body.username;
  //body.created_at = new Date.time();
  body.article_id = article_id;
  //console.log(body, "in the comments");
  // console.log(comment, "this is in postComment");
  insertComment(body).then(commentData => {
    //console.log(commentData);

    res.status(201).send({ comment: commentData });
  });
};

exports.getComments = (req, res, next) => {
  console.log("in the controller");
  const article_id = req.params;
  //console.log(article_id, "article_id");
  fetchComments(article_id)
    .then(comments => {
      console.log(comments);
      if (comments.length === 0) {
        return Promise.reject();
      }
      res.status(200).send({ comments: comments });
    })
    .catch(err => {
      next(err);
    });
};

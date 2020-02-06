const { insertComment } = require("../models/comments.models");
const { renameKey } = require("../db/utils/utils");

exports.postComment = (req, res, next) => {
  const { article_id } = req.params;
  const body = req.body;

  body.created_by = body.username;
  delete body.username;
  //body.created_at = new Date.time();
  body.article_id = article_id;
  body.votes = 0;
  //console.log(body, "in the comments");
  // console.log(comment, "this is in postComment");
  insertComment(body).then(commentData => {
    //console.log(commentData);

    res.status(201).send({ comment: commentData });
  });
};

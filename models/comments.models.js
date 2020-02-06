const knex = require("../db/connection");

exports.comment_count = article_id => {
  return knex
    .select("*")
    .from("comments")
    .where("article_id", article_id)
    .then(article => {
      return article.length;
    });
};

exports.insertComment = comment => {
  return (
    knex("comments")
      .select("*")
      .from("comments")
      // .where("article_id", "=", comment.article_id)
      .insert({
        body: "bee",
        article_id: 1,
        author: "rogersop",
        article_id: 1
      })
      .returning("*")
      .then(commentData => {
        return commentData;
      })
  );
};

exports.fetchComments = article_id => {
  return knex
    .select("*")
    .from("comments")
    .where(article_id)
    .then(comments => {
      // console.log(comments, "in the comments"); "article_id", "=", 1
      return comments;
    })
    .catch(err => {
      next(err);
    });
};

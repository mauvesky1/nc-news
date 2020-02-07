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
  console.log(comment, "this is the comment");
  return (
    knex("comments")
      .select("*")
      .from("comments")
      // .where("article_id", "=", comment.article_id)
      .insert(comment)
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
      return comments;
    });
};

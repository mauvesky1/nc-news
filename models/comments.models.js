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

exports.patchComment = (votes, comment_id) => {
  return knex
    .select("votes")
    .from("comments")
    .where({ comment_id: "1" })
    .increment({ votes: votes })
    .returning("*")
    .then(updatedComment => {
      return updatedComment;
    });
};

const knex = require("../db/connection");

exports.insertComment = comment => {
  return knex("comments")
    .select("*")
    .from("comments")
    .insert(comment)
    .returning("*")
    .then(commentData => {
      return commentData;
    });
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
    .where({ comment_id: comment_id })
    .increment({ votes: votes })
    .returning("*")
    .then(updatedComment => {
      return updatedComment;
    });
};

exports.deleteComment = comment_id => {
  return knex
    .select("*")
    .from("comments")
    .where({ comment_id: comment_id })
    .del();
};

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

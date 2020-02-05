const knex = require("../db/connection");

exports.fetchArticle = article_id => {
  //console.log(article_id, "checking");
  return knex
    .select("*")
    .from("articles")
    .where(article_id)
    .then(article => {
      if (article.length === 0) {
        return Promise.reject({ status: 404, msg: "Not found" });
      }
      return article;
    });
};

exports.adjustVote = (article_id, votes) => {
  console.log(article_id, votes, "inputs");
  return knex("articles")
    .increments(22)
    .returning("*")
    .where(article_id)
    .then(votes => {
      console.log("this far");
      return votes;
    });
};

const knex = require("../db/connection");

exports.fetchArticle = article_id => {
  //   return knex
  //     .select("articles.*")
  //     .from("articles")
  //     .count({ comment_count: "comments.article_id" })
  //     .leftJoin("comments", "articles.article_id", "comments.article_id")
  //     .groupBy("articles.article_id", "comments.aricle_id")
  //     .where(article_id)
  //     .then(article => {
  //       if (article.length === 0) {
  //         return Promise.reject({ status: 404, msg: "Not found" });
  //       }
  //     });
  // };
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

exports.incrementVote = (article_id, votes) => {
  return knex
    .select("votes")
    .from("articles")
    .where(article_id)
    .increment(votes)
    .returning("*")
    .then(updatedArticle => {
      return updatedArticle;
    })
    .then(article => {
      if (article.length === 0) {
        return Promise.reject({ status: 404, msg: "Not found" });
      }
      return article;
    });
};
exports.fetchArticles = (sort_by, order_by, author, topic) => {
  if (order_by !== "asc" && order_by !== "desc") {
    order_by = "asc";
  }

  return knex
    .select("articles.*")
    .from("articles")
    .leftJoin("comments", "articles.article_id", "comments.article_id")
    .count({ comment_count: "articles.article_id" })
    .groupBy("articles.article_id", "comments.article_id")
    .modify(query => {
      if (author) {
        query.where("articles.author", author);
      }
      if (topic) {
        query.where("articles.topic", topic);
      }
    })
    .orderBy(sort_by || "created_at", order_by || "asc");
};

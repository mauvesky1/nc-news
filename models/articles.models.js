const knex = require("../db/connection");
const { checkTopicExists } = require("../models/topics.models");

exports.fetchArticle = article_id => {
  return knex
    .select("articles.*")
    .count({ comment_count: "articles.article_id" })
    .from("articles")
    .leftJoin("comments", "articles.article_id", "comments.article_id")
    .groupBy("articles.article_id")
    .where("articles.article_id", "=", article_id.article_id)
    .then(article => {
      //console.log(article, "in the models, articles");
      if (article.length === 0) {
        return Promise.reject({ status: 404, msg: "Not found" });
      }
      return article;
    });
};
//   return knex
//     .select("*")
//     .from("articles")
//     .where(article_id)
//     .then(article => {
//       if (article.length === 0) {
//         return Promise.reject({ status: 404, msg: "Not found" });
//       }
//       return article;
//     });
// };

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
    .orderBy(sort_by || "created_at", order_by || "asc")
    .then(result => {
      // if (result.length === 0) {
      //   return Promise.all([result, checkTopicExists("paper", "topics")]);
      // }
      return result;
    });
};

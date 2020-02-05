const knex = require("../db/connection");

// exports.fetchArticle = article_id => {
//   console.log(article_id, "input");
//   return knex
//     .select("articles.*")
//     .from("articles")
//     .count({ comment_count: "comment_id" })
//     .leftJoin("comments", "comments.article_id", "articles.article_id")
//     .groupBy(articles.article_id)
//     .where(article_id)
//     .then(article => {
//       if (article.length === 0) {
//         return Promise.reject({ status: 404, msg: "Not found" });
//       }
//       return article;
//     });
// };
exports.fetchArticle = article_id => {
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
  return knex
    .select("*")
    .from("articles") // whatever the command apply to the article
    .where(article_id)
    .increments({ votes: 22 })
    .returning("*")
    .then(votes => {
      return votes;
    });
};

//  FROM articles

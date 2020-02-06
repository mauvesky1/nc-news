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

//   return knex("treasures")
//     .insert(treasure)
//     .returning("*")
//     .then(item => {
//       return item;
//     })
//     .catch(() => {
//       return Promise.reject({ status: 400, msg: "Bad request, check input" });
//     });
// };

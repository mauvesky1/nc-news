const knex = require("../db/connection");

exports.fetchTopics = () => {
  return knex.select("*").from("topics");
};

exports.checkTopicExists = topic => {
  return knex
    .select("*")
    .from("topics")
    .where("slug", "=", topic)
    .then(dataRows => {
      if (dataRows.length === 0) {
        return false;
      }
      return true;
    });
};

exports.checkAuthorExists = author => {
  return knex
    .select("*")
    .from("articles")
    .where("author", "=", author)
    .then(dataRows => {
      if (dataRows.length === 0) {
        return false;
      }
      return true;
    });
};

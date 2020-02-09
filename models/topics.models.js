const knex = require("../db/connection");

exports.fetchTopics = () => {
  return knex.select("*").from("topics");
};

exports.checkTopicExists = (column_name, table) => {
  return knex
    .select("*")
    .from(table)
    .where("slug", "=", "paper")
    .then(dataRows => {
      if (dataRows.length === 0) {
        return false;
      } else {
        return true;
      }
    });
};

const knex = require("../db/connection");

exports.fetchTopics = () => {
  // console.log("in the models");
  return knex.select("*").from("topics");
};

exports.checkTopicExists = (column_name, table) => {
  console.log(column_name, table, "in the function");
  return knex
    .select("*")
    .from(table)
    .where("slug", column_name)
    .then(dataRows => {
      console.log("inside the function");
      if (dataRows.length === 0) {
        return false;
      } else {
        return true;
      }
    });
};

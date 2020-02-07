const knex = require("../db/connection");

exports.fetchTopics = () => {
  // console.log("in the models");
  return knex.select("*").from("topics");
};

exports.checkExists = (column_name, table) => {
  return knex
    .select("*")
    .from(table)
    .where(column_name)
    .then(dataRows => {
      console.log("inside the function");
      if (dataRows.length === 0) {
        return false;
      } else {
        return true;
      }
    });
};

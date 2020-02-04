const knex = require("../db/connection");

exports.fetchTopics = () => {
  console.log("in the models");
  return knex.select("*").from("topics");
};

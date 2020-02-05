const knex = require("../db/connection");

exports.fetchUser = username => {
  //console.log(username);
  return knex
    .select("*")
    .from("users")
    .where(username)
    .then(user => {
      if (user.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "User not found, check input"
        });
      }
      return user;
    });
  // return knex("users")
  //   .where({ username: "butter_bridge" })
  //   .select("*")
  //   .returning("*");
};

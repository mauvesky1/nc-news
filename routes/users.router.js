const users_router = require("express").Router();
const { getUser } = require("../controllers/users.controller.js");

users_router.route("/:username").get(getUser);

module.exports = users_router;

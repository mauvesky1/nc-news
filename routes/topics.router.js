const topics_router = require("express").Router();
const { getTopics } = require("../controllers/topics.controller.js");

topics_router.route("/").get(getTopics);

module.exports = topics_router;

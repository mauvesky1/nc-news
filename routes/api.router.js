const api_router = require("express").Router();
const topics_router = require("./topics.router");
app.use("/topics", topics_router);

module.exports = api_router;

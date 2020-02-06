const express = require("express");
const api_router = require("./routes/api.router");
const app = express();
const {
  customErrorHandler,
  send404
} = require("./error-handlers/error.handlers");

app.use(express.json());
app.use("/api", api_router);
app.use(customErrorHandler);
app.use("/*", send404);
module.exports = app;

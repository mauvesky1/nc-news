const express = require("express");
const api_router = require("./routes/api.router");
const app = express();

app.use(express.json());

app.use("api/", api_router);

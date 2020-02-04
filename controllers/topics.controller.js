const { fetchTopics } = require("../models/topics.models");
exports.fetchTopics = (req, res, next) => {
  this.fetchTopics().then(topics => {
    res.status(200).send({ topics });
  });
};

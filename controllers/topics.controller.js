const { fetchTopics } = require("../models/topics.models");

exports.getTopics = (req, res, next) => {
  //console.log("in the controller");
  fetchTopics()
    .then(topics => {
      res.status(200).send({ topics: topics });
    })
    .catch(err => {
      next(err);
    });
};

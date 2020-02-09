const {
  fetchArticles,
  fetchArticle,
  incrementVote
} = require("../models/articles.models");

const {
  checkTopicExists,
  checkAuthorExists
} = require("../models/topics.models");

exports.getArticle = (req, res, next) => {
  const article_id = req.params;
  fetchArticle(article_id)
    .then(article => {
      const result = article[0];
      res.status(200).send({ user: result });
    })
    .catch(err => {
      next(err);
    });
};

exports.patchArticle = (req, res, next) => {
  const { article_id } = req.params;
  const votes = req.body;

  incrementVote(req.params, votes)
    .then(result => {
      res.status(200).send({ article: result[0] });
    })
    .catch(err => {
      next(err);
    });
};

exports.getArticles = (req, res, next) => {
  const { sort_by, order, author, topic } = req.query;

  return Promise.all([
    fetchArticles(sort_by, order, author, topic),
    topic,
    author
  ])
    .then(result => {
      if (topic === undefined) {
        result[1] = "paper";
      }
      if (author === undefined) {
        result[2] = "lurker";
      }

      return Promise.all([
        checkTopicExists(result[1]),
        result[0],
        checkAuthorExists(result[2])
      ]);
    })
    .then(result => {
      if (result[0] === true && result[2] === true) {
        res.status(200).send({ articles: result[1] });
      } else {
        return Promise.reject({ status: 400, msg: "Bad query" });
      }
    })
    .catch(err => {
      next(err);
    });
};

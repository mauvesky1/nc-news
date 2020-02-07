const {
  fetchArticles,
  fetchArticle,
  incrementVote
} = require("../models/articles.models");
const { comment_count } = require("../models/comments.models");

exports.getArticle = (req, res, next) => {
  const article_id = req.params;
  fetchArticle(article_id)
    .then(article => {
      return Promise.all([comment_count(article[0].article_id), article]);
    })
    .then(([noOfComments, article]) => {
      article[0].comment_count = noOfComments;
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
  const { sort_by, order } = req.query;

  fetchArticles(sort_by, order)
    .then(result => {
      res.status(200).send({ articles: result });
    })
    .catch(next);
};

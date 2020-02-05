const { fetchArticle, adjustVote } = require("../models/articles.models");

exports.getArticle = (req, res, next) => {
  const { article_id } = req.params;

  fetchArticle(req.params)
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
  adjustVote(req.params, votes).then(result => {
    console.log(result);
  });
};

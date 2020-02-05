const { fetchArticle } = require("../models/articles.models");

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

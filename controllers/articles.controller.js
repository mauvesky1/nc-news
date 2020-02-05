const { fetchArticle } = require("../models/articles.models");

exports.getArticle = (req, res, next) => {
  console.log(req.params);
  fetchArticle(username).then(article => {
    const result = article[0];
    console.log(result);
  });
};

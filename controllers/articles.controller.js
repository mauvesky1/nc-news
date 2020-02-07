const {
  fetchArticles,
  fetchArticle,
  incrementVote
} = require("../models/articles.models");
const { comment_count } = require("../models/comments.models");

const { checkTopicExists } = require("../models/topics.models");

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
  const { sort_by, order, author, topic } = req.query;
  //console.log(author);topi
  fetchArticles(sort_by, order, author, topic)
    .then(result => {
      //console.log(result, boo, "hmm");
      // if (boo === false) {
      //   return Promise.reject({
      //     status: 400,
      //     msg: "There is no data associated with this input"
      //   });
      // }
      if (result.length === 0) {
        return Promise.reject({ status: 400, msg: "Bad query" });
      }
      res.status(200).send({ articles: result });
    })
    .catch(err => {
      // console.log("in the catch", err);
      next(err);
    });
};

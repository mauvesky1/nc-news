const { fetchUser } = require("../models/users.models");

exports.getUser = (req, res, next) => {
  const username = req.params;

  fetchUser(username)
    .then(user => {
      const result = user[0];
      res.status(200).send({ user: result });
    })
    .catch(err => {
      next(err);
    });
};

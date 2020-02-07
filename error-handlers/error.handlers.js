exports.customErrorHandler = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  } else if (err.code === "22P02") {
    res.status(400).send({ msg: "URL string incorrect" });
  } else if (err.code === "42703") {
    res.status(400).send({ msg: "Bad query" });
  } else {
    next(err);
  }
};

exports.send404 = (err, req, res, next) => {
  res.status(404).send({ msg: "404 not found here!" });
};

exports.send405 = (err, req, res, next) => {
  res.status(405).send({ msg: "Not Allowed" });
};

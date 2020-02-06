exports.customErrorHandler = (err, req, res, next) => {
  //console.log(err, "in error handler");
  if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  } else if (err.code === "22P02") {
    res.status(400).send({ msg: "URL string incorrect" });
  } else {
    next(err);
  }
};

exports.send404 = (err, req, res, next) => {
  res.status(404).send({ msg: "404 not found here!" });
};

exports.customErrorHandler = (err, req, res, next) => {
  console.log("sending error");
  if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
};

exports.send404 = (req, res, next) => {
  res.status(404).send({ msg: "404 not found here!" });
};

const { StatusCodes } = require("http-status-codes");
const errorHandlerMiddleware = (err, req, res, next) => {
  //set custom error as default
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong Try Again later!!",
  };

  //Customise ValidationError ;
  if (err.name === "ValidationError") {
    customError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(",");
    customError.statusCode = 400;
  }

  //set Duplicate Error
  if (err.code || err.code === 11000) {
    customError.msg = `Duplicate Value entered for ${Object.keys(
      err.keyValue
    )} field, Please Choose another Value`;
    customError.statusCode = 400;
  }

  //set Cast Error
  if (err.name === "CastError") {
    customError.msg = `No item found with id ${err.value}`;
    customError.statusCode = 400;
  }

  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ msg: customError.msg });
};

module.exports = errorHandlerMiddleware;

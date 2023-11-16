// custom error handler class
class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

const errorMiddleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  return res.status(err.statusCode).json({
    error: {
      msg: err.message,
    },
  });
};

module.exports = { errorMiddleware, default: ErrorHandler };

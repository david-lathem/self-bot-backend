import AppError from "../utils/appError.js";

const errorHandler = (err, req, res, next) => {
  res.status(err instanceof AppError ? err.statusCode : 500);

  res.json({
    status: "error",
    message: err instanceof AppError ? err.message : "Something went wrong!",
  });
};

export default errorHandler;

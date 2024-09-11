import ApiError from "../Utils/ApiError";

const ErrorHandler = (err, req, res, next) => {
  let error;
  let err = { ...err };
  err.message = err.message;

  // Mongoose Cast Error
  if (err.name === "castError") {
    const message = "Resource Not Found";
    error = new ApiError(404, message);
  }

  // Duplicate key error
  if (err.name === 11000) {
    const message = "Duplicate field value entered";
    error = new ApiError(400, message);
  }

  // Mongoose Validation
  if (err.name === "ValidationError") {
    const message = Object.values(err.error).map((val) => val.message);
    error = new ApiError(400, message);
  }
};

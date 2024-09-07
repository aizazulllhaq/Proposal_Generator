import express from "express";
import cors from "cors";
import { FPORT, FRONTEND_URL } from "./constant.js";
import cookieParser from "cookie-parser";
import ApiError from "./Utils/ApiError.js";

const app = express();

app.use(
  cors({
    origin: `${FRONTEND_URL}/${FPORT}`,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Middlewares


// Routers



app.use("*", (req, res, next) => {
  return next(new ApiError(404, "Not Found"));
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Internal Server Error" } = err;

  res.status(statusCode).json({ message });
});

export default app;

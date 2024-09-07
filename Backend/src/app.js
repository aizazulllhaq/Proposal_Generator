import express from "express";
import cors from "cors";
import { FPORT, FRONTEND_URL } from "./constant.js";
import cookieParser from "cookie-parser";
import ApiError from "./Utils/ApiError.js";

const app = express();

app.use(
  cors({
    origin: `${FRONTEND_URL}/${FPORT}`,
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Middlewares
// Routers
import authUserRouter from "./Routes/Auth.User.Routes.js";
import userRouter from "./Routes/User.Routes.js";
import proposalRouter from "./Routes/Proposal.Routes.js";

app.use("/api/v1/users/auth", authUserRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/proposal", proposalRouter);

app.use("*", (req, res, next) => {
  return next(new ApiError(404, "Not Found"));
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Internal Server Error" } = err;

  res.status(statusCode).json({ message });
});

export default app;

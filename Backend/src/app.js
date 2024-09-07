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
app.use(checkAuthentication);

// Routers
import authUserRouter from "./Routes/Auth.User.Routes.js";
import userRouter from "./Routes/User.Routes.js";
import proposalRouter from "./Routes/Proposal.Routes.js";
import {
  checkAuthentication,
  restrictSecureRoutesFromUnAuthenticatedUsers,
} from "./Middlewares/Auth.Middleware.js";

app.use("/api/v1/users/auth", authUserRouter);
app.use(
  "/api/v1/users",
  restrictSecureRoutesFromUnAuthenticatedUsers(["NORMAL", "ADMIN"]),
  userRouter
);
app.use(
  "/api/v1/proposal",
  restrictSecureRoutesFromUnAuthenticatedUsers(["NORMAL", "ADMIN"]),
  proposalRouter
);

app.use("*", (req, res, next) => {
  return next(new ApiError(404, "Not Found"));
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    message,
  });
});


export default app;

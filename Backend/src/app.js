import express from "express";
import cors from "cors";
import { FPORT, FRONTEND_URL } from "./constant.js";
import cookieParser from "cookie-parser";
import ApiError from "./Utils/ApiError.js";

const app = express();

app.use(
  cors({
    // origin: `${FRONTEND_URL}/${FPORT}`,
    origin:"http://localhost:5173",
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
import Proposal from "./Models/Proposal.Model.js";
import ApiResponse from "./Utils/ApiResponse.js";

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

app.get("/getProposals", async (req, res, next) => {

  // Fetching the user's proposals
  const proposals = await Proposal.find({}).lean();

  const updatedProposals = proposals.map((proposal) => {
    const nProposal = proposal.content.split("\n");
    return { ...proposal, content: nProposal };
  });

  const output = updatedProposals.map((item) => ({
    ...item,
    content: item.content.filter((el) => el.trim() !== ""),
  }));

  res.status(200).json(new ApiResponse(true, "User Proposals", output));
});

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

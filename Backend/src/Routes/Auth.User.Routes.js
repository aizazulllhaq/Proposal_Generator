import { Router } from "express";
import {
  forgetPasswordRequest,
  resetPassword,
  signIn,
  signUp,
  authCheck,
  verifyMail,
} from "../Controllers/Auth.User.Controller.js";
import upload from "../Middlewares/Multer.Middleware.js";

const authUserRouter = Router();

//   api/v1/users/auth

authUserRouter
  .post("/signup", upload.single("profileImage"), signUp)
  .post("/verify-mail/:token", verifyMail)
  .post("/signin", signIn)
  .post("/forget-password", forgetPasswordRequest)
  .post("/reset-password", resetPassword)
  .get("/check", authCheck);

export default authUserRouter;

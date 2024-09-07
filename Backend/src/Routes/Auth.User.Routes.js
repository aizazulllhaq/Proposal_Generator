import { Router } from "express";
import {
  forgetPasswordRequest,
  resetPassword,
  signIn,
  signUp,
} from "../Models/Auth.User.Controller.js";

const authUserRouter = Router();

authUserRouter
  .post("/signup", signUp)
  .post("/signin", signIn)
  .post("/forget-password", forgetPasswordRequest)
  .post("/reset-password", resetPassword);

export default authUserRouter;

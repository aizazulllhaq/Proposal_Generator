import { Router } from "express";
import {
  getUser,
  logoutUser,
  updateUser,
} from "../Controllers/User.Controller.js";

const userRouter = Router();

userRouter
  .post("/my", getUser)
  .post("/logout", logoutUser);

export default userRouter;

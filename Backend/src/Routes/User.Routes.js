import { Router } from "express";
import {
  getUser,
  logoutUser,
} from "../Controllers/User.Controller.js";

const userRouter = Router();

userRouter
  .get("/my", getUser)
  .post("/logout", logoutUser);

export default userRouter;

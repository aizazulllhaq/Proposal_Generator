import { Router } from "express";
import {
  getUser,
  logoutUser,
  updateUser,
} from "../Controllers/User.Controller.js";

const userRouter = Router();

userRouter
  .post("/my", getUser)
  .patch("/edit", updateUser)
  .post("/logout", logoutUser);

export default userRouter;

import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../constant.js";
import ApiError from "../Utils/ApiError.js";

export const checkAuthentication = (req, res, next) => {
  const accessToken = req.cookies?.accessToken;

  req.user = null;

  if (accessToken) {
    try {
      const user = jwt.verify(accessToken, JWT_SECRET);

      if (user) {
        req.user = user;

        next();
      }
    } catch (error) {
      next(new ApiError(400, "Invalid AccessToken"));
    }
  }
};

export const restrictSecureRoutesFromUnAuthenticatedUsers = (role = []) => {
  return (req, res, next) => {
    if (!req.user) next(new ApiError(400, "Please First Login"));

    if (!req.user.isVerified)
      next(new ApiError(400, "Please First Verify Mail"));

    if (!role.includes(req.user.role))
      next(new ApiError(400, "Role Must be Present"));
  };

  next();
};

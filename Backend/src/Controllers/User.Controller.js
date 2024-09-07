import User from "../Models/User.Model.js";
import ApiResponse from "../Utils/ApiResponse.js";
import wrapAsync from "../Utils/wrapAsync.js";

export const getUser = wrapAsync(async (req, res, next) => {
  const uid = req.user?.id;

  const user = await User.findById(uid).select("name email profileImage");

  if (!user) return next(404, "User Not Found");

  res.status(200).json(new ApiResponse(true, "User Detail", user));
});

export const logoutUser = wrapAsync(async (req, res, next) => {
  const uid = req.user?.id;

  const user = await User.findById(uid);

  if (!user) return next(404, "User Not Found");

  res
    .status(200)
    .clearCookie("accessToken")
    .json(new ApiResponse(true, "Logout User", {}));
});

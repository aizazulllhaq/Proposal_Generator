import { uploadOnCloudinary } from "../Config/Cloudinary.Config.js";
import User from "../Models/User.Model.js";
import ApiError from "../Utils/ApiError.js";
import ApiResponse from "../Utils/ApiResponse.js";
import generateRandomToken from "../Utils/generateRandomToken.js";
import {
  EmailVerificationMail,
  ForgetPasswordMail,
} from "../Utils/SendMail.js";
import wrapAsync from "../Utils/wrapAsync.js";

export const signUp = wrapAsync(async (req, res, next) => {
  const { name, email, password } = req.body;
  const profileImg = req.file?.path;
  console.log(profileImg);

  const isUser = await User.findOne({ email });

  if (isUser) return next(new ApiError(400, "Email Already Registered"));

  const cloudinaryResponse = await uploadOnCloudinary(profileImg);

  const newUser = new User({
    name,
    email,
    password,
    profileImage: cloudinaryResponse.secure_url,
  });

  const token = generateRandomToken(100);

  newUser.token = token;

  await newUser.save();

  EmailVerificationMail(newUser, token);

  res
    .status(201)
    .json(
      new ApiResponse(
        true,
        "User Created , Please Verify your mail to login",
        {}
      )
    );
});

export const verifyMail = wrapAsync(async (req, res, next) => {
  const { token } = req.params;

  const isUser = await User.findOne({ token });

  if (!isUser) return next(new ApiError(400, "Invalid Token"));

  isUser.token = "";
  isUser.isVerified = true;

  await isUser.save();

  const accessToken = await isUser.generateAccessToken();

  res
    .status(201)
    .cookie("accessToken", accessToken, { httpOnly: true, SameSite: "none" })
    .json(new ApiResponse(true, "User verification completed", {}));
});

export const signIn = wrapAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const isUser = await User.findOne({ email });

  if (!isUser) return next(new ApiError(400, "Invalid Credentials"));

  const isPasswordCorrect = await isUser.isPasswordMatch(password);

  if (!isPasswordCorrect) return next(new ApiError(400, "Invalid Credentials"));

  if (!isUser.isVerified)
    return next(new ApiError(400, "Please first verify mail"));

  const accessToken = await isUser.generateAccessToken();

  res
    .status(201)
    .cookie("accessToken", accessToken, { httpOnly: true, SameSite: "none" })
    .json(new ApiResponse(true, "User Login", {}));
});

export const forgetPasswordRequest = wrapAsync(async (req, res, next) => {
  const email = req.body.email;

  const isUser = await User.findOne({ email });

  if (!isUser) return next(new ApiError(404, "User Not Found"));

  const token = generateRandomToken(100);

  isUser.token = "";
  isUser.token = token;

  await isUser.save();

  ForgetPasswordMail(isUser, token);

  res
    .status(200)
    .json(
      new ApiResponse(
        true,
        "Forget Password link has been send , please check your inbox",
        {}
      )
    );
});

export const resetPassword = wrapAsync(async (req, res, next) => {
  const { token } = req.params;
  const { password } = req.body;

  const isUser = await User.findOne({ token });

  if (!isUser) return next(new ApiError(400, "User Not Found"));

  isUser.password = password;

  await isUser.save();

  res
    .status(200)
    .json(
      new ApiResponse(
        true,
        "Password has been Reset Successfully , please login",
        {}
      )
    );
});

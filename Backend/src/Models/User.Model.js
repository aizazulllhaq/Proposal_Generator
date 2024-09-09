import bcrypt from "bcrypt";
import { model, Schema } from "mongoose";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../constant.js";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
    },
    token: {
      type: String,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      default: "NORMAL",
      enum: ["NORMAL", "ADMIN"],
    },
  },
  {
    timestamps: true,
  }
);

const virtual = userSchema.virtual("id");
virtual.get(function () {
  return this._id;
});

userSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10); // return hash-password

  next();
});

userSchema.methods.isPasswordMatch = async function (password) {
  return await bcrypt.compare(password, this.password); // return true-false
};

userSchema.methods.generateAccessToken = function () {
  const payload = {
    id: this._id,
    email: this.email,
    role: this.role,
    isVerified: this.isVerified,
  };

  return jwt.sign(payload, JWT_SECRET);
};

const User = model("User", userSchema);

export default User;

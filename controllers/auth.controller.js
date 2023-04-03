import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModel from "../models/User.model.js";
import { createError } from "../utils/error.util.js";

// REGISTER
export const registerUser = async (req, res, next) => {
  try {
    // hash password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const user = new UserModel({
      username: req.body.username,
      password: hash,
      email: req.body.email,
    });

    await user.save();
    res.status(200).json({
      success: true,
      status: 200,
      message: "User has been created successfully",
    });

    const savedRoom = await room.save();
    res.status(200).json(savedRoom);
  } catch (error) {
    next(error);
  }
};

// login
export const loginUser = async (req, res, next) => {
  try {
    // check if user exists
    const user = await UserModel.findOne({ username: req.body.username });
    if (!user)
      return next(
        createError(
          404,
          "User does not exists",
          "Please check your username",
          "error"
        )
      );

    // check if password correct
    const isPasswordCorrect = await bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(
        createError(
          404,
          "Invalid credentials",
          "Please check your username and password",
          "error"
        )
      );

    // set jwt token
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET
    );

    const { username } = user._doc;

    // set accessToken as cookie
    res
      .cookie("vms_authtoken", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ token, username });
  } catch (error) {
    next(error);
  }
};

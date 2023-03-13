import bcrypt from "bcryptjs";
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
      email: req.body.email
    });

    await user.save();
    res.status(200).json({
      success: true,
      status: 200,
      message: "User has been created successfully",
    })

    const savedRoom = await room.save();
    res.status(200).json(savedRoom);
  } catch (error) {
    next(error);
  }
}


// login
export const loginUser = async (req, res, next) => {
  try {
    // check if user exists
    const user = await UserModel.findOne({username: req.body.username});
    if(!user) return next(createError(404, "User does not exists"));

    // check if password correct
    const isPasswordCorrect = await bcrypt.compareSync(req.body.password, user.password);
    if(!isPasswordCorrect) return next(createError(404, "Invalid credentials"));

    const {isAdmin, password, ...rest} = user._doc;

    res.json({...rest});

  } catch (error) {
    next(error);
  }
}
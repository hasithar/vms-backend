import bcrypt from "bcryptjs";
import UserModel from "../models/User.model.js";

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
import bcrypt from "bcryptjs";
import UserModel from "./../models/User.model.js";
import { createError } from "../utils/error.util.js";
import { createResponse } from "../utils/response.util.js";

// CREATE
export const createUser = async (req, res, next) => {
  try {
    // get user detail
    const { password, ...values } = req.body;

    // hash password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const user = new UserModel({ ...values, password: hash });
    const savedUser = await user.save();
    const data = savedUser.toJSON();
    const { _id, __v, createdAt, updatedAt, ...rest } = data;

    res
      .status(200)
      .json(
        createResponse(
          200,
          "Success!",
          `User has been registered successfully`,
          "success",
          rest
        )
      );

    // res.status(200).json(savedUser);
  } catch (error) {
    next(error);
  }
};

// UPDATE
export const updateUser = async (req, res, next) => {
  try {
    const userData = req?.body;

    // hash if password changed
    if (userData?.password) {
      const { password, ...values } = req.body;

      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);

      const userData = { ...values, password: hash };
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      req.params.id,
      { $set: userData },
      { new: true }
    );
    const data = updatedUser.toJSON();
    const { _id, __v, createdAt, updatedAt, ...rest } = data;

    res
      .status(200)
      .json(
        createResponse(
          200,
          "Success!",
          `User data has been updated successfully`,
          "success",
          [rest]
        )
      );
  } catch (error) {
    next(error);
  }
};

// DELETE
export const deleteUser = async (req, res, next) => {
  try {
    await UserModel.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json(
        createResponse(200, "User deleted", `from the database`, "success")
      );
    // res.status(200).json(`User ${req.params.id} has been deleted`);
  } catch (error) {
    return next(
      createError(500, "Error deleting user.", "Please try again", "error")
    );
  }
};

// GET SINGLE
export const getUser = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

// GET ALL
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await UserModel.find().lean();
    const userFiltered = users.map(({ password, ...rest }) => rest);

    res.status(200).json(userFiltered);
  } catch (error) {
    next(error);
  }
};

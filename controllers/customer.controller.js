import CustomerModel from "../models/Customer.model.js";
import { createError } from "../utils/error.util.js";
import { createResponse } from "../utils/response.util.js";

// CREATE
export const createCustomer = async (req, res, next) => {
  try {
    const customer = new CustomerModel(req.body);
    const savedCustomer = await customer.save();
    const data = savedCustomer.toJSON();
    const { _id, __v, createdAt, updatedAt, ...rest } = data;

    res
      .status(200)
      .json(
        createResponse(
          200,
          "Success!",
          `Customer has been registered successfully`,
          "success",
          rest
        )
      );

    // const savedCustomer = await customer.save();
    // res.status(200).json(savedCustomer);
  } catch (error) {
    next(error);
  }
};

// UPDATE
export const updateCustomer = async (req, res, next) => {
  try {
    const updatedCustomer = await CustomerModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    const data = updatedCustomer.toJSON();
    const { _id, __v, createdAt, updatedAt, ...rest } = data;

    res
      .status(200)
      .json(
        createResponse(
          200,
          "Success!",
          `Customer data has been updated successfully`,
          "success",
          [rest]
        )
      );
    // res.status(200).json(updatedCustomer);
  } catch (error) {
    next(error);
  }
};

// DELETE
export const deleteCustomer = async (req, res, next) => {
  try {
    await CustomerModel.findByIdAndDelete(req.params.id);

    res
      .status(200)
      .json(
        createResponse(200, "Customer deleted", `from the database`, "success")
      );
  } catch (error) {
    return next(
      createError(500, "Error deleting customer.", "Please try again", "error")
    );
  }
};

// GET SINGLE
export const getCustomer = async (req, res, next) => {
  try {
    const customer = await CustomerModel.findById(req.params.id);
    res.status(200).json(customer);
  } catch (error) {
    next(error);
  }
};

// GET ALL
export const getAllCustomers = async (req, res, next) => {
  try {
    const customers = await CustomerModel.find();
    res.status(200).json(customers);
  } catch (error) {
    next(error);
  }
};

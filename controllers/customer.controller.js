import CustomerModel from "../models/Customer.model.js";

// CREATE
export const createCustomer = async (req, res, next) => {
  const customer = new CustomerModel(req.body);

  try {
    const savedCustomer = await customer.save();
    res.status(200).json(savedCustomer);
  } catch (error) {
    next(error);
  }
}

// UPDATE
export const updateCustomer = async (req, res, next) => {
  try {
    const updatedCustomer = await CustomerModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedCustomer);
  } catch (error) {
    next(error);
  }
}

// DELETE
export const deleteCustomer = async (req, res, next) => {
  try {
    await CustomerModel.findByIdAndDelete(req.params.id);
    res.status(200).json(`Customer ${req.params.id} has been deleted`);
  } catch (error) {
    next(error);
  }
}

// GET SINGLE
export const getCustomer = async (req, res, next) => {
  try {
    const customer = await CustomerModel.findById(req.params.id);
    res.status(200).json(customer);
  } catch (error) {
    next(error);
  }
}

// GET ALL
export const getAllCustomers = async (req, res, next) => {
  try {
    const customers = await CustomerModel.find();
    res.status(200).json(customers);
  } catch (error) {
    next(error);
  }
}
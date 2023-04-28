import AppointmentModel from "../models/Appointment.model.js";
import { createError } from "../utils/error.util.js";
import { createResponse } from "../utils/response.util.js";

// CREATE
export const createAppointment = async (req, res, next) => {
  try {
    const appointment = new AppointmentModel(req.body);
    const savedAppointment = await appointment.save();
    const data = savedAppointment.toJSON();
    const { _id, __v, createdAt, updatedAt, ...rest } = data;

    res
      .status(200)
      .json(
        createResponse(
          200,
          "Success!",
          `Appointment has been created successfully`,
          "success",
          rest
        )
      );

    // const savedAppointment = await appointment.save();
    // res.status(200).json(savedAppointment);
  } catch (error) {
    next(error);
  }
};

// UPDATE
export const updateAppointment = async (req, res, next) => {
  try {
    const updatedAppointment = await AppointmentModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedAppointment);
  } catch (error) {
    next(error);
  }
};

// DELETE
export const deleteAppointment = async (req, res, next) => {
  try {
    await AppointmentModel.findByIdAndDelete(req.params.id);
    res.status(200).json(`Appointment ${req.params.id} has been deleted`);
  } catch (error) {
    next(error);
  }
};

// GET SINGLE
export const getAppointment = async (req, res, next) => {
  try {
    const appointment = await AppointmentModel.findById(req.params.id);
    res.status(200).json(appointment);
  } catch (error) {
    next(error);
  }
};

// GET ALL
export const getAllAppointments = async (req, res, next) => {
  try {
    const appointments = await AppointmentModel.find();
    res.status(200).json(appointments);
  } catch (error) {
    next(error);
  }
};

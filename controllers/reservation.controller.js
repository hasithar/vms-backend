import ReservationModel from "../models/Reservation.model.js";
import { createError } from "../utils/error.util.js";
import { createResponse } from "../utils/response.util.js";

// CREATE
export const createReservation = async (req, res, next) => {
  try {
    const reservation = new ReservationModel(req.body);
    const savedReservation = await reservation.save();
    const data = savedReservation.toJSON();
    const { __v, createdAt, updatedAt, ...rest } = data;

    res
      .status(200)
      .json(
        createResponse(
          200,
          "Success!",
          `Reservation has been created successfully`,
          "success",
          rest
        )
      );

    // const savedReservation = await reservation.save();
    // res.status(200).json(savedReservation);
  } catch (error) {
    next(error);
  }
};

// UPDATE
export const updateReservation = async (req, res, next) => {
  try {
    const updatedReservation = await ReservationModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    const data = updatedReservation.toJSON();
    const { __v, createdAt, updatedAt, ...rest } = data;

    res
      .status(200)
      .json(
        createResponse(
          200,
          "Success!",
          `Reservation data has been updated successfully`,
          "success",
          [rest]
        )
      );
    // res.status(200).json(updatedReservation);
  } catch (error) {
    next(error);
  }
};

// DELETE
export const deleteReservation = async (req, res, next) => {
  try {
    await ReservationModel.findByIdAndDelete(req.params.id);
    res.status(200).json(`Reservation ${req.params.id} has been deleted`);
  } catch (error) {
    next(error);
  }
};

// GET SINGLE
export const getReservation = async (req, res, next) => {
  try {
    const reservation = await ReservationModel.findById(req.params.id);
    res.status(200).json(reservation);
  } catch (error) {
    next(error);
  }
};

// GET ALL
export const getAllReservations = async (req, res, next) => {
  try {
    const reservations = await ReservationModel.find();
    res.status(200).json(reservations);
  } catch (error) {
    next(error);
  }
};

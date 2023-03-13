import RoomModel from "../models/Room.model.js";

// CREATE
export const createRoom = async (req, res, next) => {
  const room = new RoomModel(req.body);

  try {
    const savedRoom = await room.save();
    res.status(200).json(savedRoom);
  } catch (error) {
    next(error);
  }
}

// UPDATE
export const updateRoom = async (req, res, next) => {
  try {
    const updatedRoom = await RoomModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedRoom);
  } catch (error) {
    next(error);
  }
}

// DELETE
export const deleteRoom = async (req, res, next) => {
  try {
    await RoomModel.findByIdAndDelete(req.params.id);
    res.status(200).json(`Room ${req.params.id} has been deleted`);
  } catch (error) {
    next(error);
  }
}

// GET SINGLE
export const getRoom = async (req, res, next) => {
  try {
    const room = await RoomModel.findById(req.params.id);
    res.status(200).json(room);
  } catch (error) {
    next(error);
  }
}

// GET ALL
export const getAllRooms = async (req, res, next) => {
  try {
    const rooms = await RoomModel.find();
    res.status(200).json(rooms);
  } catch (error) {
    next(error);
  }
}
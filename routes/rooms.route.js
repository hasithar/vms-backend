import express from "express";
import RoomModel from "../models/Room.model.js";

const router = express.Router();

// CREATE
router.post("/", async (req, res, next) => {
  const room = new RoomModel(req.body);

  try {
    const savedRoom = await room.save();
    res.status(200).json(savedRoom);
  } catch (error) {
    res.status(500).json(error);
  }
})

// UPDATE
router.put("/:id", async (req, res, next) => {
  try {
    const updatedRoom = await RoomModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedRoom);
  } catch (error) {
    res.status(500).json(error);
  }
})

// DELETE
router.delete("/:id", async (req, res, next) => {
  try {
    await RoomModel.findByIdAndDelete(req.params.id);
    res.status(200).json(`Room ${req.params.id} has been deleted`);
  } catch (error) {
    res.status(500).json(error);
  }
})

// GET SINGLE
router.get("/:id", async (req, res, next) => {
  try {
    const room = await RoomModel.findById(req.params.id);
    res.status(200).json(room);
  } catch (error) {
    res.status(500).json(error);
  }
})

// GET ALL
router.get("/", async (req, res, next) => {
  try {
    const rooms = await RoomModel.find();
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json(error);
  }
})


export default router;
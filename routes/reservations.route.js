import express from "express";
import {
  createReservation,
  deleteReservation,
  getAllReservations,
  getReservation,
  updateReservation,
} from "../controllers/reservation.controller.js";

const router = express.Router();

// CREATE
router.post("/", createReservation);

// UPDATE
router.put("/:id", updateReservation);

// DELETE
router.delete("/:id", deleteReservation);

// GET SINGLE
router.get("/:id", getReservation);

// GET ALL
router.get("/", getAllReservations);

export default router;

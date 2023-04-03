import express from "express";
import { createAppointment, deleteAppointment, getAllAppointments, getAppointment, updateAppointment } from "../controllers/appointment.controller.js";

const router = express.Router();

// CREATE
router.post("/", createAppointment);

// UPDATE
router.put("/:id", updateAppointment);

// DELETE
router.delete("/:id", deleteAppointment);

// GET SINGLE
router.get("/:id", getAppointment);

// GET ALL
router.get("/", getAllAppointments);


export default router;
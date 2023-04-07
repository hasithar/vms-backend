import express from "express";
import {
  createCustomer,
  deleteCustomer,
  getAllCustomers,
  getCustomer,
  updateCustomer,
} from "../controllers/customer.controller.js";
import { authCheck } from "../utils/authCheck.util.js";

const router = express.Router();

// CREATE
router.post("/", createCustomer);

// UPDATE
router.put("/:id", updateCustomer);

// DELETE
router.delete("/:id", deleteCustomer);

// GET SINGLE
router.get("/:id", getCustomer);

// GET ALL
router.get("/", authCheck, getAllCustomers);

export default router;

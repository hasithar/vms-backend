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
router.post("/", authCheck, createCustomer);

// UPDATE
router.put("/:id", authCheck, updateCustomer);

// DELETE
router.delete("/:id", authCheck, deleteCustomer);

// GET SINGLE
router.get("/:id", authCheck, getCustomer);

// GET ALL
router.get("/", authCheck, getAllCustomers);

export default router;

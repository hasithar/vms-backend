import express from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from "../controllers/user.controller.js";
import {
  checkIsAuthenticated,
  checkIsOwnResource,
  checkIsAdmin,
} from "../utils/tokenCheck.util.js";
import { authCheck } from "../utils/authCheck.util.js";

const router = express.Router();

// CREATE
// router.post("/", checkIsAdmin, createUser);
router.post("/", authCheck, createUser);

// UPDATE
// router.put("/:id", checkIsOwnResource, updateUser);
router.put("/:id", authCheck, updateUser);

// DELETE
// router.delete("/:id", checkIsOwnResource, deleteUser);
router.delete("/:id", authCheck, deleteUser);

// GET SINGLE
// router.get("/:id", checkIsOwnResource, getUser);
router.get("/:id", authCheck, getUser);

// GET ALL
// router.get("/", checkIsAdmin, getAllUsers);
router.get("/", authCheck, getAllUsers);

export default router;

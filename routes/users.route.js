import express from "express";
import { createUser, deleteUser, getAllUsers, getUser, updateUser } from "../controllers/user.controller.js";
import { checkIsAuthenticated, checkIsOwnResource, checkIsAdmin } from "../utils/tokenCheck.util.js";

const router = express.Router();

// // CHECK AUTH
// router.get("/authcheck", verifyAuthtoken, (req, res, next) => {
//   res.send("hello, you are logged in");
// });

// router.get("/usercheck/:id", verifyUser, (req, res, next) => {
//   res.send("hello, you are logged in can modify your account");
// });

// router.get("/admincheck/:id", verifyAdmin, (req, res, next) => {
//   res.send("hello, you are logged in can modify all accounts");
// });

// CREATE
router.post("/", checkIsAdmin, createUser);

// UPDATE
router.put("/:id", checkIsOwnResource, updateUser);

// DELETE
router.delete("/:id", checkIsOwnResource, deleteUser);

// GET SINGLE
router.get("/:id", checkIsOwnResource, getUser);

// GET ALL
router.get("/", checkIsAdmin, getAllUsers);


export default router;
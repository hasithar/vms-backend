import express from "express";
const router = express.Router();

router.get('/', function(req, res, next) {
  res.send('response from reservations route');
});

// CREATE

// UPDATE

// DELETE

// GET ALL

// GET SINGLE

export default router;
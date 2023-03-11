import express from "express";
const router = express.Router();

router.get('/', function(req, res, next) {
  res.send('response from appointments route');
});

export default router;
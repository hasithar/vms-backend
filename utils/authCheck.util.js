import jwt from "jsonwebtoken";
import { createError } from "./error.util.js";

// CHECK IF LOGGED IN
export const authCheck = (req, res, next) => {
  // get auth header
  const authHeader = req.headers.authorization;
  console.log(
    "🚀 ~ file: authCheck.util.js:8 ~ authCheck ~ authHeader:",
    authHeader
  );

  // check header
  if (!authHeader) {
    return next(
      createError(
        401,
        "Not authenticated",
        "Authorization header missing",
        "error"
      )
    );
  }

  // check token
  const token = authHeader.split(" ")[1];
  if (!token) {
    return next(
      createError(
        401,
        "Not authenticated",
        "Authorization token missing",
        "error"
      )
    );
  }

  // validate token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return next(
      createError(401, "Invalid token", "Token invalid or expired", "error")
    );
  }
};

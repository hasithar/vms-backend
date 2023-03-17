import jwt from "jsonwebtoken";
import {createError} from "./error.util.js";

// CHECK IF LOGGED IN
export const checkIsAuthenticated = (req, res, next) => {
  // get token from cookie
  const token = req.cookies.vms_authtoken;

  // check if authenticated
  if(!token) {
    return next(createError(401, "Not authenticated"));
  }

  // validate token
  jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
    if(error) {
      return next(createError(403, "Invalid token"));
    }
    req.user = user;
    console.log("🚀 ~ file: tokenCheck.util.js:20 ~ jwt.verify ~ user:", user)
    next();
  });
}


// CHECK IF REQUESTING OWN RESOURCE
export const checkIsOwnResource = (req, res, next) => {
  checkIsAuthenticated(req, res, () => {
    if(req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "Not permitted"));
    }
  });
}


// CHECK IF REQUESTING AS ADMIN
export const checkIsAdmin = (req, res, next) => {
  checkIsAuthenticated(req, res, () => {
    console.log("🚀 ~ file: tokenCheck.util.js:41 ~ checkIsAuthenticated ~ req:", req.user);
    
    if(req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "Not permitted"));
    }
  });
}

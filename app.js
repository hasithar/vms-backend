import express from "express";
import createError from "http-errors";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import sassMiddleware from "node-sass-middleware";
import cors from "cors";

import { fileURLToPath } from "url";
import { dirname } from "path";

// ruoutes
import indexRouter from "./routes/index.js";
import usersRouter from "./routes/users.route.js";
import authRouter from "./routes/auth.route.js";
import appointmentsRouter from "./routes/appointments.route.js";
import customersRouter from "./routes/customers.route.js";
import reservationsRouter from "./routes/reservations.route.js";
import roomsRouter from "./routes/rooms.route.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// app
const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// middleware
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(
  sassMiddleware({
    src: path.join(__dirname, "public"),
    dest: path.join(__dirname, "public"),
    indentedSyntax: true, // true = .sass and false = .scss
    sourceMap: true,
  })
);
app.use(express.static(path.join(__dirname, "public")));

// router middleware
app.use("/", indexRouter);
// api v1
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/appointments", appointmentsRouter);
app.use("/api/v1/customers", customersRouter);
app.use("/api/v1/reservations", reservationsRouter);
app.use("/api/v1/rooms", roomsRouter);
app.use("/api/v1/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// catch other errors
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMesage = err.message || "Error completing the request";
  const errorDescription = err.description || "";
  const errorSeverity = err.severity || "error";

  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMesage,
    stack: err.stack,
    description: errorDescription,
    severity: errorSeverity,
  });
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

export default app;

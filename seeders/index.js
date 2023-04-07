import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import seedCustomers from "./customer.seeder.js";

// config env
dotenv.config({
  path: path.resolve(new URL(import.meta.url).pathname, "../../.env"),
});

// connect to db
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("connected", () => {
  console.log("mogodb atlas connected");
});

connect();

// run seeders
seedCustomers();

import mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
    },
    address: {
      type: String,
    },
    city: {
      type: String,
    },
    referredBy: {
      type: String,
    },
    assignedTo: {
      type: String,
    },
    status: {
      type: String,
      required: true,
    },
    comments: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Customer", CustomerSchema);

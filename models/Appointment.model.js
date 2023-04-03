import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema({
  customerTitle: {
    type: String,
    required: true
  },
  customerName: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  referredBy: {
    type: String,
  },
  assignedTo: {
    type: String,
  },
  status: {
    type: String,
    required: true
  },
  comments: {
    type: String,
  },
}, {timestamps: true});

export default mongoose.model("Appointment", AppointmentSchema);
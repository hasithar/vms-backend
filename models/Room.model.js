import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  capacity: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  beds: {
    type: Number,
    required: true,
  },
  facilities: {
    type: [String]
  },
  photos: {
    type: [String]
  },
  roomNumber: {
    type: Number,
    required: true,
    unique: true
  },
  blockedDates: {
    type: [Date]
  }
}, {timestamps: true});

export default mongoose.model("Room", RoomSchema);
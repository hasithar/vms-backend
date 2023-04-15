import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
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
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      unique: true,
      sparse: true,
      required: false,
    },
    password: {
      type: String,
    },
    type: {
      type: String,
    },
    role: {
      type: String,
    },
    isLoginEnabled: {
      type: Boolean,
      required: true,
      default: false,
    },
    gender: {
      type: String,
      required: false,
    },
    managedBy: {
      type: String,
    },
    status: {
      type: String,
      required: true,
    },
    comments: {
      type: String,
    },
    // isAdmin: {
    //   type: Boolean,
    //   required: true,
    //   default: false,
    // },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);

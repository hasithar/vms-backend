import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema(
  {
    customer: {
      id: {
        type: String,
      },
      name: {
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
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: false,
    },
    referredBy: {
      type: {
        id: {
          type: String,
        },
        name: {
          type: String,
        },
        refertype: {
          type: String,
        },
      },
    },
    assignedTo: {
      type: {
        id: {
          type: String,
        },
        name: {
          type: String,
        },
        role: {
          type: String,
        },
      },
    },
    status: {
      type: String,
      required: true,
    },
    comments: {
      type: String,
    },

    // customerTitle: {
    //   type: String,
    //   required: true,
    // },
    // customerName: {
    //   type: String,
    //   required: true,
    // },
    // phone: {
    //   type: String,
    //   required: true,
    // },
    // email: {
    //   type: String,
    //   required: true,
    // },
  },
  { timestamps: true }
);

export default mongoose.model("Appointment", AppointmentSchema);

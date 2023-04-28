import mongoose from "mongoose";

const ReservationSchema = new mongoose.Schema(
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
        // unique: true,
      },
      email: {
        type: String,
      },
    },
    date: {
      type: String,
      required: false,
    },
    session: {
      type: String,
      required: false,
    },
    pax: {
      type: String,
      required: false,
    },
    ballroom: {
      type: String,
      required: false,
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
    package: {
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

export default mongoose.model("Reservation", ReservationSchema);

import mongoose from "mongoose";
const { Schema } = mongoose;

const rideRequest = new Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    pickUp: { type: String, required: true },
    dropOff: { type: String, required: true },
  },
  { timestamps: true }
);

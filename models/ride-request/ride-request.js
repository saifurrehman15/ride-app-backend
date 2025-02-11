import mongoose from "mongoose";
const { Schema } = mongoose;

const RideRequestSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
      index: true,
    },
    assignedRider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "riders",
      default: "empty",
    },
    pickUp: { type: String, required: true, trim: true },
    dropOff: { type: String, required: true, trim: true },
    fare: { type: Number, default: 100 },
    action: {
      type: String,
      default: "pending",
      enum: ["pending", "accepted", "rejected"],
    },
  },
  { timestamps: true }
);

export const RideRequest =
  mongoose.models.RideRequest ||
  mongoose.model("RideRequest", RideRequestSchema);

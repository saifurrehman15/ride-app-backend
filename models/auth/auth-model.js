import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    userName: { type: String, required: true },
    phone: { type: Number, required: true, unique: true },
    pin: { type: String, required: true },
    profileImg: String,
    address: String,
    bio: String,
    cnic: { type: String, unique: true },
    role: { type: String, default: "user" },
    reviews: [],
    rideHistory: [],
    availability: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const userModel =
  mongoose.models.users || mongoose.model("users", UserSchema);

import mongoose from "mongoose";

const { Schema } = mongoose;

const AreasSchema = new Schema({
  area: String,
  latitute: Number,
  longitute: Number,
  landmarks: [],
});

export const areasModel =
  mongoose.models.areas || mongoose.model("areas", AreasSchema);

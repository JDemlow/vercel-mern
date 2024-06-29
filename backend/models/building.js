// models/building.js
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const buildingSchema = new Schema(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Building = mongoose.model("Building", buildingSchema);

export default Building;

import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  content: { type: String, required: true },
});

export const Service =
  mongoose.models.Service || mongoose.model("Service", ServiceSchema);

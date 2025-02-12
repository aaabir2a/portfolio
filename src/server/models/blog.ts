import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  image: { type: String }, // Store image URL
  createdAt: { type: Date, default: Date.now },
});

// Prevent OverwriteModelError
export const Blog = mongoose.models.Blog || mongoose.model("Blog", BlogSchema);

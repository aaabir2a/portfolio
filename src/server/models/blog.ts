import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },

  image: {
    type: String, // Store URL of the uploaded image
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Blog = mongoose.models.Blog || mongoose.model("BLog", BlogSchema);

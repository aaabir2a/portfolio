import express from "express";
import { Request, Response } from "express";
import { Blog } from "../models/blog";
import auth from "../midleware/auth";

const router = express.Router();

// Get all blogs
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch {
    res.status(500).json({ message: "Error fetching blogs" });
  }
});

// Get a single blog
router.get("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      res.status(404).json({ message: "Blog not found" });
      return;
    }
    res.json(blog);
  } catch {
    res.status(500).json({ message: "Error fetching blog" });
  }
});

// Create a new blog
router.post("/", auth, async (req, res) => {
  try {
    const newBlog = new Blog(req.body);
    await newBlog.save();
    res.status(201).json(newBlog);
  } catch {
    res.status(400).json({ message: "Error creating blog" });
  }
});

// Update a blog
router.put("/:id", auth, async (req, res): Promise<void> => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedBlog) {
      res.status(404).json({ message: "Blog not found" });
      return;
    }
    res.json(updatedBlog);
  } catch {
    res.status(400).json({ message: "Error updating blog" });
  }
});

// Delete a blog
router.delete("/:id", auth, async (req, res): Promise<void> => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
    if (!deletedBlog) {
      res.status(404).json({ message: "Blog not found" });
      return;
    }
    res.json({ message: "Blog deleted successfully" });
  } catch {
    res.status(500).json({ message: "Error deleting blog" });
  }
});

export { router as blogRouter };

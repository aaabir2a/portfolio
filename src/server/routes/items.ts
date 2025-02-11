import express from "express";
import { Item } from "../models/Item";

const router = express.Router();

// Get all items
router.get("/", async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch {
    res.status(500).json({ message: "Error fetching items" });
  }
});

// Create a new item
router.post("/", async (req, res) => {
  try {
    const newItem = new Item(req.body);
    await newItem.save();
    res.status(201).json(newItem);
  } catch {
    res.status(400).json({ message: "Error creating item" });
  }
});

// Update an item
router.put("/:id", async (req, res) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedItem);
  } catch {
    res.status(400).json({ message: "Error updating item" });
  }
});

// Delete an item
router.delete("/:id", async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.json({ message: "Item deleted successfully" });
  } catch {
    res.status(400).json({ message: "Error deleting item" });
  }
});

export { router as itemRouter };

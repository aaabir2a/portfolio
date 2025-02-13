import express from "express";
import { Service } from "../models/service";
import auth from "../midleware/auth";
import { Request } from "express";
import { Response } from "express";

const router = express.Router();

//get all services

router.get("/", async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });
    res.json(services);
  } catch {
    res.status(500).json({ message: "Error fetching services" });
  }
});

// Get a single service
router.get("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      res.status(404).json({ message: "Blog not found" });
      return;
    }
    res.json(service);
  } catch {
    res.status(500).json({ message: "Error fetching blog" });
  }
});

// Create a new service
router.post("/", auth, async (req, res) => {
  try {
    const newService = new Service(req.body);
    await newService.save();
    res.status(201).json(newService);
  } catch {
    res.status(400).json({ message: "Error creating service" });
  }
});

// Update a service
router.put("/:id", auth, async (req, res): Promise<void> => {
  try {
    const updatedService = await Service.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!updatedService) {
      res.status(404).json({ message: "Service not found" });
      return;
    }
    res.json(updatedService);
  } catch {
    res.status(400).json({ message: "Error updating service" });
  }
});

// Delete a blog
router.delete("/:id", auth, async (req, res): Promise<void> => {
  try {
    const deletedService = await Service.findByIdAndDelete(req.params.id);
    if (!deletedService) {
      res.status(404).json({ message: "SErvice not found" });
      return;
    }
    res.json({ message: "Service deleted successfully" });
  } catch {
    res.status(500).json({ message: "Error deleting service" });
  }
});

export { router as serviceRouter };

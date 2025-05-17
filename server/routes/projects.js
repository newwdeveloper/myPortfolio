import express from "express";
import cloudinary from "cloudinary";
import { check, validationResult } from "express-validator";
import Project from "../model/Project.js";
import auth from "../middleware/auth.js";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

router.get("/", async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json({ projects });
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
});

router.post(
  "/",
  [
    auth,
    [
      check("title", "title is required").not().isEmpty(),
      check("description", "description require").not().isEmpty(),
      check("technologies", "Technologies are required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { title, description, link, technologies } = req.body;
    const file = req.files?.image;
    try {
      if (!file) return res.status(400).json({ msg: "Image is required" });

      const result = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "portfolio",
      });

      const project = new Project({
        title,
        description,
        image: result.secure_url,
        link,
        technologies: technologies.split(",").map((tech) => tech.trim()),
      });

      await project.save();
      res.json(project);
    } catch (error) {
      res.status(500).json({ msg: "Server error" });
    }
  }
);

router.put(
  "/:id",
  [
    auth,
    [
      check("title", "Title is required").not().isEmpty(),
      check("description", "Description is required").not().isEmpty(),
      check("technologies", "Technologies are required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, link, technologies } = req.body;
    const file = req.files?.image;

    try {
      const project = await Project.findById(req.params.id);
      if (!project) return res.status(404).json({ msg: "Project not found" });

      project.title = title;
      project.description = description;
      project.link = link || project.link;
      project.technologies = technologies.split(",").map((tech) => tech.trim());

      if (file) {
        const result = await cloudinary.uploader.upload(file.tempFilePath, {
          folder: "portfolio",
        });
        project.image = result.secure_url;
      }

      await project.save();
      res.json(project);
    } catch (error) {
      res.status(500).json({ msg: " Lopes Server error" });
    }
  }
);

router.delete("/:id", auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ msg: "Project not found" });

    const publicId = project.image.split("/").pop().split(".")[0];
    await cloudinary.uploader.destroy(`portfolio/${publicId}`);

    await project.remove();
    res.json({ msg: "Project deleted" });
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
});

export default router;

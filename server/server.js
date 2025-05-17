import express from "express";
import connectDB from "./config/dbConfig.js";
import dotenv from "dotenv";
import cors from "cors";
import fileUpload from "express-fileupload";
import authRoutes from "./routes/auth.js";
import projectRoutes from "./routes/projects.js";
import contactRoutes from "./routes/contact.js";

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use(fileUpload({ useTempFiles: true }));
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/contact", contactRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

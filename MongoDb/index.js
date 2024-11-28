import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import connectDB from "./src/db/index.js";
import todoRoutes from "./src/routes/routes.js";

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/v1", todoRoutes);

// Server Initialization
const startServer = async () => {
  try {
    // Database Connection
    await connectDB();
    console.log("Database connected successfully");

    // Starting the server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start the server:", error);
    process.exit(1); // Exit process with failure
  }
};

startServer();

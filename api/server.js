import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import buildingsRouter from "./routes/buildings.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const uri = process.env.MONGO_URI;
mongoose
  .connect(uri)
  .then(() => {
    console.log("MongoDB database connection established successfully");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// Define Routes
app.use("/buildings", buildingsRouter);

// Root Route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Export the app as a Vercel serverless function
export default app;

// by default the type of module is commonjs
// to use import and export we need to set the type to module in package.json
import express from "express";
// const express = require("express");
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// What is an Endpoint?
// An endpoint is a specific URL where an API can be accessed by a client application.
// (An endpoint is a combination of a URL + HTTP method that lets the client interact with a specific resource.)

// Middleware
// cors configuration should be before rate limiter
app.use(
  cors({
    origin: "http://localhost:5173", // Allow requests from this origin
  })
);
app.use(express.json()); // to parse JSON request bodies
app.use(rateLimiter);

// // simple custom middleware
// app.use((req, res, next) => {
//   console.log(`Req method is ${req.method} & Req URL is ${req.url}`);
//   next(); // Call the next middleware or route handler
// });

app.use("/api/notes", notesRoutes);

// app.patch, app.delete

// we would like to first connect to the database and then start application
// A small optimization to avoid starting the server if the database connection fails
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server is running on PORT : ", PORT);
  });
});

const express = require('express');
const app = express();
const path = require('path');
require("dotenv").config();
const cors = require('cors');
app.use(cors());

// Database configuration (assuming it's in dbConfig.js)
const connectDB = require("./config/dbConfig");

// Routes
const portfolioRoute = require("./routes/portfolioRoute");

// Middleware
app.use(express.json());

// Connect to MongoDB
connectDB();

// API routes
app.use("/api/portfolio", portfolioRoute);

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "frontend/public")));

    // For all other requests, serve React's index.html
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "frontend/public/index.html"));
    });
}

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server Listening on PORT ${port}`);
});

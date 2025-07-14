/* -------------------------------------------------
   server.js
   Minimal Express API that checks MongoDB Atlas
--------------------------------------------------*/

require("dotenv").config();            // Load variables from .env
const express = require("express");
const { MongoClient } = require("mongodb");

const app  = express();
const PORT = process.env.PORT || 3001;

// Connection URI from .env
const uri = process.env.MONGO_URI;

// Create a single shared MongoClient (modern driver: no extra options needed)
const client = new MongoClient(uri);

/**
 * Connect to MongoDB once and reuse the client.
 * Returns true on success, false on failure.
 */
async function connectToDatabase() {
  try {
    if (!client.topology?.isConnected()) {
      await client.connect();
      console.log("✅  MongoDB connected");
    }
    return true;
  } catch (err) {
    console.error("❌  MongoDB connection error:", err.message);
    return false;
  }
}

/* -------- Routes --------------------------------*/
app.get("/", async (_req, res) => {
  const isConnected = await connectToDatabase();
  if (isConnected) {
    res.json({ message: "Successfully connected to the database!" });
  } else {
    res.status(500).json({ message: "Failed to connect to the database." });
  }
});

/* -------- Start server ---------------------------*/
app.listen(PORT, async () => {
  await connectToDatabase();           // Attempt connection on boot
  console.log(`Server running at http://localhost:${PORT}`);
});

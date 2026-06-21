// Entry point for the backend server.
// Loads environment variables, connects to the MongoDB database,
// and starts the Express application.
import "dotenv/config";
import app from "./src/app.js";
import connectDB from "./src/config/db.js";

const PORT = process.env.PORT || 5000;

// Initialize database connection before launching the server.
await connectDB();

// Start Express server and listen on configured port.
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});

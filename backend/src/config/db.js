import mongoose from "mongoose";

// Connect to MongoDB using the URI from environment variables.
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("☑️  MongoDB Connected sucessfully");
  } catch (error) {
    console.log(error.message);

    // Exit the process if the database connection fails.
    process.exit(1);
  }
};

export default connectDB;  // Export the database connection helper.


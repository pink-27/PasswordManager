const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://vihan:vihan@cluster0.pbrdw.mongodb.net/Node-API?retryWrites=true&w=majority&appName=Cluster0",
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
    console.log("Connected to database!");
  } catch (error) {
    console.error("Database connection failed!", error.message);
    process.exit(1);
  }
};

module.exports = { connectDB };

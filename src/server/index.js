const express = require("express");
const cors = require("cors");
const { connectDB } = require("./middleware/database");
const productRoutes = require("./routes/productRoutes");

const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/passwords", productRoutes);

app.get("/", (req, res) => {
  res.send("Hello");
});

// Start Server
app.listen(3000, () => {
  console.log("Server started on port 3000");
});

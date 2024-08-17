const express = require("express");
const app = express();
const Product = require("./models/credential.model.js");
const mongoose = require("mongoose");
const cors = require('cors');
mongoose
  .connect(
    "mongodb+srv://vihan:vihan@cluster0.pbrdw.mongodb.net/Node-API?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("Connected to database!"))
  .catch(() => {
    console.log("Connection Failed!");
  });


console.log(123);
app.use(express.json());

app.use(cors())
app.listen(3000, () => {
  console.log("Vihan is here");
});

app.get("/", (req, res) => {
  res.send("Hello");
});



app.post("/api/passwords", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/passwords", async (req, res) => {
  try {
    const product = await Product.find({});
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/passwords/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put("/api/passwords/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);
    if (!product) {
      res.status(404).json({ message: "Product not found!" });
    }
    const updatedproduct = await Product.findById(id);

    res.status(200).json(updatedproduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete("/api/passwords/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id, req.body);
    if (!product) {
      res.status(404).json({ message: "Product not found!" });
    }
    res.status(200).json({ message: "Product Deleted!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// {
//   "website": "hello.com",
//   "username": "Vihan",
//   "password": "123pass"
// }

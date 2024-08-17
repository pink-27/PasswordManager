const mongoose = require("mongoose");
const ProductSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "website name required"],
    },
    website: {
      type: String,
      required: [true, "website url required"],
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,

    }
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", ProductSchema)
module.exports = Product;
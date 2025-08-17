import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  quantity: {
    type: Number,
    min: 0,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  brand: {
    type: String,
    required: true,
    trim: true,
  },
  imageUrls: [String],
  rating: {
    type: Number,
    default: 5,
    min: 0,
    max: 5
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  createdBy:{
    type: mongoose.Schema.Types.ObjectId,
    required:true,
    ref: "User"
  }


});

const model = mongoose.model("Product", productSchema);
export default model;
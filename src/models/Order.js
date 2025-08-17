import mongoose from "mongoose";
import { CONFIRMED_STATUS, DELIVERED_STATUS, PENDING_STATUS, SHIPPING_STATUS } from "../constant/status.js";

const orderSchema = new mongoose.Schema({
  name: {
    type: String,

  },
  number: {
    type: Number,

  },
  orderId: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  orderItem: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Product"
      },
      quantity: {
        type: Number,
        default: 1,
      }
    }
  ],
  totalPrice: {
    type: Number,
    required: true
  },
  shippingAddress: {
    city: String,
    province: String,
    postalCode: Number,
    streetAddress: String,
    country: {
      type: String,
      default: "Nepal",
    }
  },
  status: {
    type: String,
    enum: [PENDING_STATUS, CONFIRMED_STATUS, SHIPPING_STATUS, DELIVERED_STATUS],
    default: PENDING_STATUS
  },
  paymentMethod: {
    type: String,
    default: "online"
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  }
});

const Order = mongoose.model("Order", orderSchema);
export default Order
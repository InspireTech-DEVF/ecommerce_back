import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  cart_id: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cart",
    required: true
  }],
  total: { 
    type: Number, 
    required: true 
  },
  isActive: { 
    type: Boolean, 
    default: true 
  },
}, { timestamps: true });

const Order = mongoose.model("Order", orderSchema);

export default Order;
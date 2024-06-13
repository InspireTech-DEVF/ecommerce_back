import mongoose from "mongoose";
/* 

cartSchema.pre('save', function(next) {
  this.sumTotal = this.quantity * this.unitPrice
  next()
}) */

const cartSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    item_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
      required: true,
    },
    quantity: { type: Number, required: true },
    sumTotal: { type: Number },
    unitPrice: {
      type: Number,
      required: true,
    },
    isActive: { type: Boolean, default: true },
    isOrder: { type: Boolean, default: false }
  },
  { timestamps: true }
);

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;

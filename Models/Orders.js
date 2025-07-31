import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  orderedItems: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      title: String,
      qty: Number,
      price: Number,
      image: String
    },
  ],
  userShipping: {
    fullname: String,
    phone: String,
    address: String,
    city: String,
    state: String,
    pincode: String,
    country: String,
  },
  amount: Number,
  payStatus: {
    type: String,
    default: "Pending",
  },
 orderStatus: {
  type: String,
  enum: ["Processing", "Shipped", "Delivered", "Cancelled"],
  default: "Processing",
},
  paymentId: String,
  orderId: String,
  signature: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Order", orderSchema);

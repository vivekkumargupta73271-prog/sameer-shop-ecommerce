const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    unique: true,
    required: true
  },
  customer: {
    name: String,
    email: String,
    phone: String,
    address: String,
    city: String,
    state: String,
    pincode: String
  },
  items: [{
    productId: mongoose.Schema.Types.ObjectId,
    productName: String,
    quantity: Number,
    price: Number,
    size: String,
    color: String
  }],
  totalAmount: {
    type: Number,
    required: true
  },
  paymentMethod: {
    type: String,
    enum: ['UPI', 'Card', 'COD'],
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Completed', 'Failed'],
    default: 'Pending'
  },
  orderStatus: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Pending'
  },
  razorpayOrderId: String,
  razorpayPaymentId: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Order', orderSchema);

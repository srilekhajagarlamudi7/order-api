const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  productIds: [{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Product'
  }],
  totalAmount: {
    type: Number,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);

// walletModel.js
import mongoose from 'mongoose';

const CustomerWalletSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CustomerModel', // Assuming your Customer model is named 'Customer'
    required: true,
  },
  balance: {
    type: Number,
    default: 0,
  },
  // Additional fields if needed
});

const CustomerWalletModel = mongoose.model('CustomerWallets', CustomerWalletSchema);

export default CustomerWalletModel;

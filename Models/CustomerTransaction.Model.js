// transactionModel.js
import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CustomerModel',
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    enum: ['debit', 'credit'],
    required: true,
  },
  // Additional fields for transaction details if needed
  // For example, 'description', 'timestamp', etc.
});

const CustomerTransactionModel = mongoose.model('Transaction', transactionSchema);

export default CustomerTransactionModel;

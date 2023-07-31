// transactionController.js
import CustomerTransactionModel from '../Models/CustomerTransaction.Model.js';
import { updateWalletBalance } from './CustomerWallet.Controller.js';


// Create a new transaction
export const createTransaction = async (customerId, amount, type) => {
  try {
    const transaction = await CustomerTransactionModel.create({ customerId, amount, type });
    return transaction;
  } catch (error) {
    throw new Error('Error creating transaction');
  }
};

// Get all transactions for a customer
export const getTransactionsByCustomerId = async (req, res, next) => {
  try {
   
    const {id} = req.params;
    const transactions = await CustomerTransactionModel.find({ customerId:id });
    return res.send({
      status: 'success',
      data:transactions
    })
  } catch (error) {
    return res.send({
      status: 'Fail',
      message:error
    })
  }
};

// Other transaction-related functions, e.g., update, delete, etc.
// You can add more functions based on your application's requirements.

export const processTransaction = async (req, res, next) => {
    try {
      const {customerId, amount, type} = req.body;
      const Amount =parseInt(amount);
      console.log(customerId,Amount,type)
      // Create a new transaction record
      await createTransaction(customerId, Amount, type);
  
      // Update the wallet balance based on the transaction amount and type
      const transactionMultiplier = type === 'debit' ? -1 : 1;
      await updateWalletBalance(customerId, Amount * transactionMultiplier);
  
      // You can add additional transaction logic here, if needed.
      return res.send({
        status: 'success',
        message:"Transaction Success"
      })
  
    } catch (error) {
      console.log(error)
      return res.send({
        status: 'Fail',
        message:error
      })
    }
  };
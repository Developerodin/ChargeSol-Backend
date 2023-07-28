// walletController.js
import CustomerWalletModel from '../Models/CustomerWallet.Model.js';


// Create a new wallet
export const createWallet = async (customerId) => {
  try {
      const wallet = await CustomerWalletModel.create({ customerId });
      return wallet;
  } catch (error) {
      throw new Error('Wallet create failed.'); // Throw the error instead of returning a JSON response
  }
};

// Get wallet by customerId
export const getWalletByCustomerId = async (req, res, next) => {
  try {
    const {id} = req.params;
    // console.log(id);
    const wallet = await CustomerWalletModel.findOne({ customerId:id });
    return res.status(200).json({
        status: "success",
        wallet: wallet
    });
    
  } catch (error) {
    return res.status(400).json({
        status: "fail",
        message: "No Wallet Exist For Customer."
    })
  }
};

// Update wallet balance
export const updateWalletBalance = async (customerId, amount) => {
  try {
    const wallet = await CustomerWalletModel.findOneAndUpdate(
      { customerId },
      { $inc: { balance: amount } },
      { new: true }
    );
    return wallet;
   
    
  } catch (error) {
    return "fail"
  }
};

// Delete a wallet
export const deleteWallet = async (customerId) => {
  try {
    await CustomerWalletModel.findOneAndDelete({ customerId });
    return res.status(200).json({
        status: "success",
        message: "wallet deleted successfully"
    });
  } catch (error) {
    return res.status(400).json({
        status: "fail",
        message: "Error deleting wallet."
    })
    
  }
};

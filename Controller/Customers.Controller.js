import crypto from 'crypto';
import { promisify } from 'util';
import jwt from 'jsonwebtoken';

import express from 'express';
import axios from 'axios';
import  catchAsync  from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';
import sendEmail from '../utils/email.js';
import path from 'path';
import { userJoin } from '../utils/users.js';
import { User } from '../Models/Users.Model.js';

import { CustomerModel } from '../Models/Customer.Model.js';
import { createWallet } from './CustomerWallet.Controller.js';
// import { User } from './path/to/User.Model.js';

const JWT_SECRET="my-ultra-secure-and-ultra-long-secret"
const JWT_EXPIRES_IN="90d"
const JWT_COOKIE_EXPIRES_IN=90
const NODE_ENV="production"

export const signToken = id => {
    return jwt.sign({ id: id }, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN
    });
}

export const createSendToken = (user, statusCode, res, msg) => {
  
    const token = signToken(user._id);
    const cookieOptions = {
        expires: new Date(
            Date.now() + JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    };
    if (NODE_ENV === 'production') cookieOptions.secure = true;
    res.cookie('jwt', token, cookieOptions);
    res.cookie('user_id', user.id, cookieOptions);

    // Remove password from output
    user.password = undefined;
    return res.status(statusCode).json({
        status: 'success',
        message: msg,
        token,
        data: {user}
    });
}


/**
 * Sign Up
 */
export const CustomerSignup = catchAsync(async (req, res, next) => {
  try {
      const { email, password,phoneNumber } = req.body;

      // Check if the email or phone number already exists in the database
      // const existingCustomer = await CustomerModel.findOne({
      //     $or: [{ email }, { phoneNumber }],
      // });

      // if (existingCustomer) {
      //     return res.status(400).json({
      //         status: "fail",
      //         message: "User already exists with this email or phone number.",
      //     });
      // }

      // If the email or phone number is not found, proceed with creating the customer
      const newCustomer = await CustomerModel.create(req.body);

      // Create a wallet for the new customer
      const wallet = await createWallet(newCustomer._id);
      console.log(wallet);

      return res.status(200).json({
          status: "success",
          message: "Registered Successfully",
          data: {
              customer: newCustomer,
          },
      });
  } catch (error) {
      console.log(error);
      return res.status(500).json({
          status: "error",
          message: "error",
      });
  }
});



/**
 * Sign In
 */
export const CustomerSignin = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(200).json({
            status: 'fail',
            message: 'please enter email or password'
        });
    }

    const user = await CustomerModel.findOne({ email }).select('+password');
    if (!user || !await user.correctPassword(password, user.password)) {
        return res.status(200).json({
            status: 'fail',
            message: 'invalid email or password'
        });
    }

    // if (req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === '' || req.body['g-recaptcha-response'] === null) {
    //     return res.status(200).json({
    //         status: 'fail',
    //         message: 'Please select captcha'
    //     });
    // }
    const CAPTCHA_SECRET="akshay"
    const CAPTCHA_SITEKEY="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"
    var secretKey = CAPTCHA_SECRET;
    // req.connection.remoteAddress will provide IP address of connected user.
    var verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body['g-recaptcha-response'] + "&remoteip=" + req.connection.remoteAddress;
    // Hitting GET request to the URL, Google will respond with success or error scenario.
    try {
        const response = await axios.get(verificationUrl);
        const body = response.data;
      
        // Uncomment the following block if you need to parse the response body as JSON
        // const body = JSON.parse(response.data);
      
        // Success will be true or false depending upon captcha validation.
        // if (body.success == undefined || !body.success) {
        //   return res.status(200).json({
        //     status: 'fail',
        //     message: 'Failed captcha verification'
        //   });
        // } else {
        createSendToken(user, 200, res, 'Login Successfully');
        // }
      } catch (error) {
        console.error(error);
        // Handle the error condition accordingly
      }
      
});



/**
 * Forgot Password
 */
export const CustomerforgotPassword = catchAsync(async (req, res, next) => {
    // 1) Get User based on Posted Email
    const user = await CustomerModel.findOne({ email: req.body.email });
    if (!user) {
        return res.status(200).json({
            status: 'fail',
            message: 'Please Provide a Email'
        });
    }

    // 2) Generate the random reset token
    const resetToken = CustomerModel.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });

    // 3) Send it to user's email
    
    const resetURL = `${req.get('Origin')}/auth/reset_Password/${resetToken}`;
    const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to:`;

    try {
        await sendEmail({
            email: user.email,
            subject: 'Your Password reset token (valid for 10 min)',
            message,
            resetURL
        });

        return res.status(200).json({
            status: 'success',
            message: 'Token send to email',
            token: resetToken
        });
    }
    catch (err) {
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save({ validateBeforeSave: false });
        return next(new AppError('There was an error sending the email. Try again later!', 500));
    }
});

/**
 * Reset Password
 */
export const CustomerresetPassword = catchAsync(async (req, res, next) => {
    // 1) Get User based on the token
    console.log("Token",req.params.token);
    const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
    const user = await CustomerModel.findOne({ passwordResetToken: hashedToken, passwordResetExpires: { $gt: Date.now() } });
     
      console.log("pass",req.body.password);
    // 2) If token has not expired, and there is user, set the new password
    if (!user) {
        return res.status(200).json({
            status: 'fail',
            message: 'Token is invalid or has expired'
        });
    }
    user.password = req.body.password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    // 4) Log the user in, send JWT
    return res.status(200).json({
        status: 'success',
        message: 'Reset Password Successfully'
    });
});

/**
 * Logout
 */
export const Customerlogout = async (req, res) => {
    res.clearCookie('user_id');
    res.clearCookie('jwt');
    res.status(200).json({ status: 'success' });
}

export const CustomergetAllUsers = async (req, res) => {
    try {
      const users = await CustomerModel.find();
      res.status(200).json({
        status: 'success',
        data: {
          users,
        },
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve users' });
    }
  };

export const CustomereditUser = async (req, res) => {
    const userId = req.params.id;
    const updatedData = req.body;
  
    try {
      const user = await CustomerModel.findOne({_id:userId});
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      user.name = updatedData.name;
      user.email = updatedData.email;
      user.password = updatedData.password;
      user.Brand_Name = updatedData.Brand_Name;
      user.GST_No = updatedData.GST_No;
      user.MID = updatedData.MID;
      user.Registered_Address = updatedData.Registered_Address;
      user.state = updatedData.state;
      user.regional = updatedData.regional;
      user.National = updatedData.National;
      user.Initial_Balance = updatedData.Initial_Balance;
      user.Number = updatedData.Number;
      user.ABB_TestCharger = updatedData.ABB_TestCharger;
      user.Select_Price = updatedData.Select_Price;
      user.Fixed_Rent=updatedData.Fixed_Rent;
      user.Company_Share=updatedData.Company_Share;
      user.image=updatedData.image;
     console.log("Updated==>",user)
    await user.save();
      res.json(user);
    } catch (error) {
      res.status(500).json({ error });
    }
  };

  export const CustomergetUserById = async (req, res) => {
    const { id } = req.params;
  
    try {
      const user = await CustomerModel.findById(id);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };

  export const CustomerdeleteUser =async (req, res) => {
    try {
      const user = await CustomerModel.findByIdAndDelete(req.params.id);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      return res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };

  export const getCustomersByCpoId = async (req, res, next) => {
    const { cpoId } = req.params;
    console.log(cpoId);
    // Perform a query to find all chargers with the given CPO ID
    const Customer = await CustomerModel.find({ cpoId })
      // .populate('cpoId') // Use populate to fetch the related CpoUser details
      // .exec();
  
    if (!Customer || Customer.length === 0) {
      return res.status(404).json({
        status: 'fail',
        message: 'Customer not found for the given CPO ID',
      });
    }
  
    res.status(200).json({
      status: 'success',
      data: {
        Customer,
      },
    });
};

export const updateFunctionalStatus = async (req, res) => {
  const { customerId, functionalStatus } = req.body; // Assuming the frontend sends the chargerId and functionalStatus in the request body

  try {
    // Find the charger by ID
    const Customer = await CustomerModel.findById(customerId);

    if (!Customer) {
      return res.status(404).json({ error: 'Charger not found' });
    }

    // Update the functional status based on the value from the frontend
    Customer.status = functionalStatus;

    // Save the updated charger object
    await Customer.save();

    return res.status(200).json({ message: 'Functional status updated successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Something went wrong' });
  }
};
/**
 * Login Page
 */


/**
 * Index Page
 */
export const index = async (req, res) => {
    console.log("aa", req.cookies.jwt)
    if (req.cookies.jwt == undefined) {
        return res.status(200).render('login');
    } else
        res.status(200).render('index', { user: req.user })
};
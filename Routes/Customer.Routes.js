import express from 'express';
import { CpodeleteUser, CpoeditUser, CpoforgotPassword, CpogetAllUsers, CpogetUserById, index, Cpologout, CporesetPassword, CpoSignin, CpoSignup } from '../Controller/CopUsers.Controllers.js';
import { CustomerdeleteUser, CustomereditUser, CustomerforgotPassword, CustomergetAllUsers, CustomergetUserById, Customerlogout, CustomerresetPassword, getCustomersByCpoId, updateFunctionalStatus } from '../Controller/Customers.Controller.js';
import { getWalletByCustomerId } from '../Controller/CustomerWallet.Controller.js';
import { getTransactionsByCustomerId, processTransaction } from '../Controller/CustomerTransaction.Controller.js';



export const CustomersRouter = express.Router();
CustomersRouter.get('/customers', CustomergetAllUsers);
CustomersRouter.get('/customers/:id', CustomergetUserById);
CustomersRouter.get('/bycpoId/:cpoId',getCustomersByCpoId)
CustomersRouter.post('/update-functional', updateFunctionalStatus)
CustomersRouter.get('/logout', Customerlogout);
CustomersRouter.post('/forgotPassword', CustomerforgotPassword);
CustomersRouter.patch('/resetPassword/:token', CustomerresetPassword);
CustomersRouter.put('/editcustomers/:id', CustomereditUser);
CustomersRouter.delete('/deletecustomers/:id', CustomerdeleteUser);

CustomersRouter.get('/getWallet/:id', getWalletByCustomerId);

CustomersRouter.post('/processTransaction', processTransaction);

CustomersRouter.get('/gethistory/:id', getTransactionsByCustomerId);


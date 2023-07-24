import express from 'express';
import { CpodeleteUser, CpoeditUser, CpoforgotPassword, CpogetAllUsers, CpogetUserById, index, Cpologout, CporesetPassword, CpoSignin, CpoSignup } from '../Controller/CopUsers.Controllers.js';



export const cpoUserRouter = express.Router();
cpoUserRouter.get('/users', CpogetAllUsers);
cpoUserRouter.get('/users/:id', CpogetUserById);
cpoUserRouter.post('/signup', CpoSignup);
cpoUserRouter.post('/signin', CpoSignin);
cpoUserRouter.get('/logout', Cpologout);
cpoUserRouter.post('/forgotPassword', CpoforgotPassword);
cpoUserRouter.patch('/resetPassword/:token', CporesetPassword);
cpoUserRouter.put('/users/:id', CpoeditUser);
cpoUserRouter.delete('/users/:id', CpodeleteUser);




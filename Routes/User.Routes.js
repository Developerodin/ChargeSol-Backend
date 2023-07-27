import express from 'express';
import { deleteUser, editUser, forgotPassword, getAllUsers, getUserById, index, logout, resetPassword, signin, signup } from '../Controller/Users.Controllers.js';
import { createRole, deleteRole, getAllRoles, getRoleById, updateRole } from '../Controller/UserPermission.Controllers.js';

export const userRouter = express.Router();
userRouter.get('/users', getAllUsers);
userRouter.get('/users/:id', getUserById);


userRouter.get('/logout', logout);
userRouter.post('/forgotPassword', forgotPassword);
userRouter.patch('/resetPassword/:token', resetPassword);
userRouter.put('/users/:id', editUser);
userRouter.delete('/users/:id', deleteUser);

userRouter.post('/roles', async (req, res) => {
    const { name, permissions } = req.body;
    try {
      const createdRole = await createRole(name, permissions);
      res.status(201).json(createdRole);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Get all roles
  userRouter.get('/roles', async (req, res) => {
    try {
      const roles = await getAllRoles();
      res.json(roles);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Get a specific role by ID
  userRouter.get('/roles/:id', async (req, res) => {
    const { id } = req.params;
    console.log("ID role", id);
    try {
      const role = await getRoleById(id);
      res.json(role);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  });
  
  // Update a role by ID
  userRouter.put('/roles/:id', async (req, res) => {
    const { id } = req.params;
    const { name, permissions } = req.body;
    try {
      const updatedRole = await updateRole(id, name, permissions);
      res.json(updatedRole);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  });
  
  // Delete a role by ID
  userRouter.delete('/roles/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const deletedRole = await deleteRole(id);
      res.json(deletedRole);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  });


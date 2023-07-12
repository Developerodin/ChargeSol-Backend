import { UserPermission } from "../Models/Users.Permissson.Model.js";


// Create a new role
const createRole = async (name, permissions) => {
  try {
    const role = new UserPermission({ name, permissions });
    const createdRole = await role.save();
    return createdRole;
  } catch (error) {
    throw new Error('Failed to create role');
  }
};

// Get all roles
const getAllRoles = async () => {
  try {
    const roles = await UserPermission.find();
    return roles;
  } catch (error) {
    throw new Error('Failed to retrieve roles');
  }
};

// Get a specific role by ID
const getRoleById = async (id) => {
  try {
    const role = await UserPermission.findById(id);
    if (!role) {
      throw new Error('Role not found');
    }
    return role;
  } catch (error) {
    throw new Error('Failed to retrieve role');
  }
};

// Update a role by ID
const updateRole = async (id, name, permissions) => {
  try {
    const role = await UserPermission.findById(id);
    if (!role) {
      throw new Error('Role not found');
    }
    role.name = name;
    role.permissions = permissions;
    const updatedRole = await role.save();
    return updatedRole;
  } catch (error) {
    throw new Error('Failed to update role');
  }
};

// Delete a role by ID
const deleteRole = async (id) => {
  try {
    const deletedRole = await UserPermission.findByIdAndRemove(id);
    if (!deletedRole) {
      throw new Error('Role not found');
    }
    return deletedRole;
  } catch (error) {
    throw new Error('Failed to delete role');
  }
};

export {
  createRole,
  getAllRoles,
  getRoleById,
  updateRole,
  deleteRole,
};

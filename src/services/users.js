import {
  userExists,
  deleteUsersFromSupabase,
  createUser,
  updateUser,
  getUsersFromSupabase } from "../models/users.js";

// GET ALL USERS

export const getAllUsersService = async (req, res) => {
  try {
    const users = await getUsersFromSupabase();

    if(!users || users.length === 0){
      return []
    }

    return users;

  } catch (error){
    throw new Error('An error occurred: ' + error.message);
  }
}

// DELETE ONE USER

export const deleteOneUserService = async (id) => {
  if (!id) {
    throw new Error('User ID is required');
  }

  try {
    // Check if the user exists. This was necessary because Supabase doesn't return an error if the user doesn't exist, so we have to check it manually from another function (check the model)
    const exists = await userExists(id);
    if (!exists) {
      throw new Error('User not found');
    }

    const { error } = await deleteUsersFromSupabase(id);

    if (error) {
      throw error;
    }

    // If no error, the deletion was successful
    return true;
  } catch (error) {
    throw new Error('An error occurred: ' + error.message);
  }
};

// CREATE A USER SERVICE
export const createUserService = async (userData) => {
  try {
    // Validate input
    if (!userData || Object.keys(userData).length === 0) {
      throw new Error('User data is required');
    }

    // Call the createUser function (from your model)
    const newUser = await createUser(userData);

    // Check if the user was created successfully
    if (!newUser) {
      throw new Error('Failed to create user');
    }

    return newUser;
  } catch (error) {
    console.error('Error in createUserService:', error);
    throw new Error('An error occurred: ' + error.message);
  }
};

// UPDATE A USER SERVICE
export const updateUserService = async (id, userData) => {
  try {
    // Call the updateUser function (from your model)
    const updatedUser = await updateUser(id, userData);

    // Check if the user was updated successfully
    if (!updatedUser) {
      throw new Error('Failed to update user');
    }

    return updatedUser;
  } catch (error) {
    console.error('Error in updateUserService:', error);
    throw new Error('An error occurred: ' + error.message);
  }
};


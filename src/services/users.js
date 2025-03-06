import {
  userExists,
  deleteUsersFromSupabase,
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


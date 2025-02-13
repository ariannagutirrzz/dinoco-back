import { getUsersFromSupabase } from "../models/users.js";

export const getAllUsersService = async (req, res) => {
  try {
    const users = await getUsersFromSupabase();

    if(!users || users.length === 0){
      throw new Error('No users found');
    } else {
      return users;
    }

  } catch (error){
    res.status(500).json({ error: error.message });
  }
}

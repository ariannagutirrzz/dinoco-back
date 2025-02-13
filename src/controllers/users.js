import { getUsersFromSupabase } from "../models/users.js";

export const getAllUsers = async (req, res) =>{
  try {
    const users = getUsersFromSupabase();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

import { getAllUsersService } from "../services/users.js";

export const getAllUsersController = async (req, res) =>{
  try {
    const users = await getAllUsersService();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

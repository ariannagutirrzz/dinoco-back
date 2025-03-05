import { 
  deleteOneUserService,
  getAllUsersService 
} from "../services/users.js";

export const getAllUsersController = async (req, res) =>{
  try {
    const users = await getAllUsersService();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const deleteOneUserController = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const deleteUser = await deleteOneUserService(id);

    if (deleteUser) {
      return res.status(200).json({ message: 'User deleted successfully' });
    } else {
      return res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error deleting user:', error);

    if (error.message.includes('User not found')) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(500).json({ error: error.message });
  }
};


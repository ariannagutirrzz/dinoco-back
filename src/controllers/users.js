import { 
  deleteOneUserService,
  getAllUsersService,
  createUserService,
  updateUserService,
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

// CREATE A USER CONTROLLER
export const createUserController = async (req, res) => {
  try {
    const { name, id_document, phone_number } = req.body;

    // Validate required fields
    if (!name || !id_document || !phone_number) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const userData = {
      name,
      id_document,
      phone_number,
    };

    // Call the createUserService function
    const newUser = await createUserService(userData);

    // Return the newly created user
    return res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    return res.status(500).json({ error: error.message });
  }
};

// UPDATE A USER CONTROLLER
export const updateUserController = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, id_document, phone_number } = req.body;

    // Validate required fields
    if (!name || !id_document || !phone_number) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const userData = {
      name,
      id_document,
      phone_number,
    };

    // Call the updateUserService function
    const updatedUser = await updateUserService(id, userData);

    // Return the updated user
    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    return res.status(500).json({ error: error.message });
  }
};


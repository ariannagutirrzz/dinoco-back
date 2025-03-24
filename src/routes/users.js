import { Router } from 'express';
import { 
    deleteOneUserController,
    getAllUsersController,
    createUserController,
    updateUserController, 
} from '../controllers/users.js';

const router = Router();

// Define the route for GET /users
router.get('/', getAllUsersController);
router.post('/', createUserController);
router.delete('/:id', deleteOneUserController);
router.put('/:id', updateUserController);

export default router;

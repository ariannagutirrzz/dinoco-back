import { Router } from 'express';
import { 
    deleteOneUserController,
    getAllUsersController 
} from '../controllers/users.js';

const router = Router();

router.get('/', getAllUsersController);
router.delete('/:id', deleteOneUserController);

export default router;

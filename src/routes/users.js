import { Router } from 'express';
import { getAllUsersController } from '../controllers/users.js';

const router = Router();

router.get('/', getAllUsersController);

export default router;

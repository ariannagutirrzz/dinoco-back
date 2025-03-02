import { Router } from 'express';
import { AuthController } from '../controllers/auth.js';

const router = Router();

router.post('/signup', AuthController.signUp);
router.post('/signin', AuthController.signIn);

export default router;

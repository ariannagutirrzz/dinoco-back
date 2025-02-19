import { Router } from 'express';
import { getAllProvidersController } from '../controllers/providers.js';

const router = Router();

router.get('/', getAllProvidersController);

export default router;

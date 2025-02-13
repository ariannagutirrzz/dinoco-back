import { Router } from 'express';
import { getAllClientsController } from '../controllers/clients.js';

const router = Router();

router.get('/', getAllClientsController);

export default router;

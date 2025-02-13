import { Router } from 'express';
import { getAllDepositsController } from '../controllers/deposits.js';

const router = Router();

router.get('/', getAllDepositsController);

export default router;

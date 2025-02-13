import { Router } from 'express';
import { getAllDeposits } from '../controllers/deposits.js';

const router = Router();

router.get('/', getAllDeposits);

export default router;

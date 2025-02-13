import { Router } from 'express';
import { getAllSalesController } from '../controllers/sales.js';

const router = Router();

router.get('/', getAllSalesController);

export default router;

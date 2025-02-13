import { Router } from 'express';
import { getAllPurchasesController } from '../controllers/purchases.js';

const router = Router();

router.get('/', getAllPurchasesController);

export default router;

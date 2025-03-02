import { Router } from 'express';
import { 
    deleteOnePurchaseController,
    getAllPurchasesController 
} from '../controllers/purchases.js';

const router = Router();

router.get('/', getAllPurchasesController);
router.delete('/:id', deleteOnePurchaseController);

export default router;

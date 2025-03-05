import { Router } from 'express';
import { 
    deleteOneSaleController,
    getAllSalesController 
} from '../controllers/sales.js';

const router = Router();

router.get('/', getAllSalesController);
router.delete('/:id', deleteOneSaleController);

export default router;

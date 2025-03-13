import { Router } from 'express';
import { 
    deleteOneRefundController,
    getAllRefundsController 
} from '../controllers/refunds.js';

const router = Router();

router.get('/', getAllRefundsController);
router.delete('/:id', deleteOneRefundController);

export default router;

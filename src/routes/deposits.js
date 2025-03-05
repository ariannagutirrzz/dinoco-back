import { Router } from 'express';
import { 
    deleteOneDepositController,
    getAllDepositsController 
} from '../controllers/deposits.js';

const router = Router();

router.get('/', getAllDepositsController);
router.delete('/:id', deleteOneDepositController);

export default router;

import { Router } from 'express';
import { 
    deleteOneDepositController,
    getAllDepositsController, 
    createDepositController, 
    updateDepositController,
} from '../controllers/deposits.js';

const router = Router();

router.get('/', getAllDepositsController);
router.post('/', createDepositController);
router.delete('/:id', deleteOneDepositController);
router.put('/:id', updateDepositController);

export default router;

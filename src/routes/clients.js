import { Router } from 'express';
import { 
    deleteOneClientController,
    getAllClientsController, 
} from '../controllers/clients.js';

const router = Router();

router.get('/', getAllClientsController);
router.delete('/:id', deleteOneClientController);

export default router;

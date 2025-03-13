import { Router } from 'express';
import { 
    deleteOneClientController,
    getAllClientsController, 
    createClientController, 
    updateClientController,
} from '../controllers/clients.js';

const router = Router();

router.get('/', getAllClientsController);
router.post('/', createClientController);
router.delete('/:id', deleteOneClientController);
router.put('/:id', updateClientController);

export default router;

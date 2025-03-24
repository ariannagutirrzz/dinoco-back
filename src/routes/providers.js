import { Router } from 'express';
import { 
    deleteOneProviderController,
    getAllProvidersController, 
    createProviderController, 
    updateProviderController,
} from '../controllers/providers.js';

const router = Router();

router.get('/', getAllProvidersController);
router.post('/', createProviderController);
router.delete('/:id', deleteOneProviderController);
router.put('/:id', updateProviderController);

export default router;

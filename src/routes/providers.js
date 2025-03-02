import { Router } from 'express';
import { 
    deleteOneProviderController,
    getAllProvidersController 
} from '../controllers/providers.js';

const router = Router();

router.get('/', getAllProvidersController);
router.delete('/:id', deleteOneProviderController);

export default router;

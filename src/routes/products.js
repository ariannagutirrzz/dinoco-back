import { Router } from 'express';
import {
  getAllProductsController,
  deleteOneProductController,
} from '../controllers/products.js';

const router = Router();

router.get('/', getAllProductsController);
router.delete('/:id', deleteOneProductController);

export default router;

// routes/products.js
import { Router } from 'express';
import {
  getAllProductsController,
  deleteOneProductController,
  createProductController,
  updateProductController,
} from '../controllers/products.js';

const router = Router();

router.get('/', getAllProductsController);
router.post('/', createProductController);
router.delete('/:id', deleteOneProductController);
router.put('/:id', updateProductController);

export default router;

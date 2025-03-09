// routes/products.js
import { Router } from 'express';
import {
  getAllProductsController,
  deleteOneProductController,
  createProductController,
} from '../controllers/products.js';

const router = Router();

router.get('/', getAllProductsController);
router.post('/', createProductController); // Add the POST route
router.delete('/:id', deleteOneProductController);

export default router;

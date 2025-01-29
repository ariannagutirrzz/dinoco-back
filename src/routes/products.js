import { Router } from 'express';
import { getProductsFromSupabase } from '../models/products.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const productos = await getProductsFromSupabase();
    res.status(200).json(productos);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

export default router;

import { Router } from 'express';
import { getDepositsFromSupabase } from '../models/deposits.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const deposits = await getDepositsFromSupabase();
    res.status(200).json(deposits);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
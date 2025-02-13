import { Router } from 'express';
import { getUsersFromSupabase } from '../models/users.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const users = await getUsersFromSupabase();
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

export default router;

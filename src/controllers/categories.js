import { getCategoriesService } from '../services/categories.js';

export const getCategoriesController = async (req, res) => {
  try {
    const categories = await getCategoriesService();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

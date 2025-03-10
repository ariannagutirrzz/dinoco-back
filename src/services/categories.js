import { getCategories } from '../models/categories.js';

export const getCategoriesService = async () => {
  try {
    const categories = await getCategories();

    if (!categories || categories.length === 0) {
      return [];
    }
    return categories;
  } catch (error) {
    throw new Error('An error occurred: ' + error.message);
  }
};

import { getProductsFromSupabase } from "../models/products.js";

export const getAllProductsService = async (req, res) => {
  try {
    const products = await getProductsFromSupabase();

    if(!products || products.length === 0){
      throw new Error('No products found');
    } else {
      return products;
    }

  } catch (error){
    res.status(500).json({ error: error.message });
  }
}

import { getAllProductsService } from "../services/products.js";

export const getAllProductsController = async (req, res) => {
  try {
    const products = await getAllProductsService();

    if(products.length > 0) {
      return res.status(200).json(products);
    } else {
      return res.status(404).json({ message: "Products not found" });
    }

  } catch (error){
    res.status(500).json({ error: error.message });
  }
}

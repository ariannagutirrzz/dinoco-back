import {
  getAllProductsService,
  deleteOneProductService,
} from '../services/products.js';

export const getAllProductsController = async (req, res) => {
  try {
    const products = await getAllProductsService();
    return res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteOneProductController = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: 'Product ID is required' });
    }

    const deleteProduct = await deleteOneProductService(id);

    if (deleteProduct) {
      return res.status(200).json({ message: 'Product deleted successfully' });
    } else {
      return res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    console.error('Error deleting product:', error);

    if (error.message.includes('Product not found')) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(500).json({ error: error.message });
  }
};

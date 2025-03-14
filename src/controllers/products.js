import {
  getAllProductsService,
  deleteOneProductService,
  createProductService,
  updateProductService,
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

export const createProductController = async (req, res) => {
  try {
    const { name, price, quantity, deposit, sales_unit, category } = req.body;

    // Validate required fields
    if (!name || !price || !quantity || !sales_unit || !category) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (typeof price !== 'number' || price <= 0) {
      return res.status(400).json({ error: 'Price must be a positive number' });
    }

    const productData = {
      name,
      price,
      quantity,
      deposit,
      sales_unit,
      category,
    };

    const newProduct = await createProductService(productData);
    return res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error creating product:', error);
    return res.status(500).json({ error: error.message });
  }
};
export const updateProductController = async (req, res) => {
  try {

    const { id } = req.params;
    const { name, price, quantity, deposit, sales_unit, category, expire_date } = req.body;

    if (!name || !price || !quantity || !sales_unit || !category) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const updatedProduct = await updateProductService(id, {
      name,
      price,
      quantity,
      deposit,
      sales_unit,
      category,
      expire_date: expire_date || null,
    });

    return res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    return res.status(500).json({ error: error.message });
  }
};

import {
  deleteOneSaleService,
  getAllSalesService,
  createSaleService, 
  updateSaleService,
} from "../services/sales.js";
import { updateProductStock } from "../services/products.js"; // Assuming you have a service for products

export const getAllSalesController = async (req, res) => {
  try {
    const sales = await getAllSalesService();
    res.status(200).json(sales);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteOneSaleController = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: 'Sale ID is required' });
    }

    const deleteSale = await deleteOneSaleService(id);

    if (deleteSale) {
      return res.status(200).json({ message: 'Sale deleted successfully' });
    } else {
      return res.status(404).json({ message: 'Sale not found' });
    }
  } catch (error) {
    console.error('Error deleting sale:', error);

    if (error.message.includes('Sale not found')) {
      return res.status(404).json({ error: 'Sale not found' });
    }

    res.status(500).json({ error: error.message });
  }
};

export const createSaleController = async (req, res) => {
  try {
    const { id_seller, quantity, sale_date, total_price, client_id, product_id } = req.body;

    // Validate required fields
    if (!id_seller || !quantity || !sale_date || !total_price || !client_id || !product_id) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // First, check if there's enough stock in the product
    const product = await getProductById(product_id); // Assuming you have this function
    if (!product || product.quantity < quantity) {
      return res.status(400).json({ error: 'Not enough stock for this product' });
    }

    const saleData = {
      id_seller,
      quantity,
      sale_date,
      total_price,
      client_id,
      product_id, // Make sure you include the product_id here
    };

    const newSale = await createSaleService(saleData);

    // Reduce the product stock
    await updateProductStock(product_id, product.quantity - quantity); // Assuming you have an updateProductStock function

    return res.status(201).json(newSale);
  } catch (error) {
    console.error('Error creating sale:', error);
    return res.status(500).json({ error: error.message });
  }
};

export const updateSaleController = async (req, res) => {
  try {
    const { id } = req.params;
    const { id_seller, quantity, sale_date, total_price, client_id, product_id } = req.body;

    if (!id_seller || !quantity || !sale_date || !total_price || !client_id || !product_id) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const updatedSale = await updateSaleService(id, {
      id_seller,
      quantity,
      sale_date,
      total_price,
      client_id,
      product_id,
    });

    // Update the stock after sale modification
    const product = await getProductById(product_id);
    await updateProductStock(product_id, product.quantity - quantity);

    return res.status(200).json(updatedSale);
  } catch (error) {
    console.error("Error updating sale:", error);
    return res.status(500).json({ error: error.message });
  }
};

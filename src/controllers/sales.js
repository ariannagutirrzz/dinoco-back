import {
  deleteOneSaleService,
  getAllSalesService
} from "../services/sales.js";

export const getAllSalesController = async (req, res) => {
  try {
    const sales = await getAllSalesService();
    res.status(200).json(sales);
  } catch (error){
    res.status(500).json({ error: error.message });
  }
}

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

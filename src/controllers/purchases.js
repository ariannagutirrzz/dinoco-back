import {
  deleteOnePurchaseService,
  getAllPurchasesService
} from "../services/purchases.js";

export const getAllPurchasesController = async (req, res) => {
  try {
    const purchases = await getAllPurchasesService();
    res.status(200).json(purchases);
  } catch (error){
    res.status(500).json({ error: error.message });
  }
}

export const deleteOnePurchaseController = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: 'Purchase ID is required' });
    }

    const deletePurchase = await deleteOnePurchaseService(id);

    if (deletePurchase) {
      return res.status(200).json({ message: 'Purchase deleted successfully' });
    } else {
      return res.status(404).json({ message: 'Purchase not found' });
    }
  } catch (error) {
    console.error('Error deleting purchase:', error);

    if (error.message.includes('Purchase not found')) {
      return res.status(404).json({ error: 'Purchase not found' });
    }

    res.status(500).json({ error: error.message });
  }
};

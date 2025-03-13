import {
    deleteOneRefundService,
    getAllRefundsService
  } from "../services/refunds.js";
  
  export const getAllRefundsController = async (req, res) => {
    try {
      const refunds = await getAllRefundsService();
      res.status(200).json(refunds);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  
  export const deleteOneRefundController = async (req, res) => {
    try {
      const { id } = req.params;
  
      if (!id) {
        return res.status(400).json({ error: 'Refund ID is required' });
      }
  
      const deleteRefund = await deleteOneRefundService(id);
  
      if (deleteRefund) {
        return res.status(200).json({ message: 'Refund deleted successfully' });
      } else {
        return res.status(404).json({ message: 'Refund not found' });
      }
    } catch (error) {
      console.error('Error deleting refund:', error);
  
      if (error.message.includes('Refund not found')) {
        return res.status(404).json({ error: 'Refund not found' });
      }
  
      res.status(500).json({ error: error.message });
    }
  };
  
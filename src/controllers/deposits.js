import {
  deleteOneDepositService,
  getAllDepositsService
} from "../services/deposits.js";

export const getAllDepositsController = async (req, res) => {
  try {
    const deposits = await getAllDepositsService();
    res.status(200).json(deposits);
  } catch (error){
    res.status(500).json({ error: error.message });
  }
}

export const deleteOneDepositController = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: 'Deposit ID is required' });
    }

    const deleteDeposit = await deleteOneDepositService(id);

    if (deleteDeposit) {
      return res.status(200).json({ message: 'Deposit deleted successfully' });
    } else {
      return res.status(404).json({ message: 'Deposit not found' });
    }
  } catch (error) {
    console.error('Error deleting deposit:', error);

    if (error.message.includes('Deposit not found')) {
      return res.status(404).json({ error: 'Deposit not found' });
    }

    res.status(500).json({ error: error.message });
  }
};

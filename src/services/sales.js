import { getSalesFromSupabase } from "../models/sales.js";

export const getAllSalesService = async (req, res) => {
  try {
    const sales = await getSalesFromSupabase();

    if(!sales || sales.length === 0){
      throw new Error('No sales found');
    } else {
      return sales;
    }

  } catch (error){
    res.status(500).json({ error: error.message });
  }
}

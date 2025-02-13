import { getPurchasesFromSupabase } from "../models/purchases.js";

export const getAllPurchasesService = async (req, res) => {
  try {
    const purchases = await getPurchasesFromSupabase();

    if(!purchases || purchases.length === 0){
      throw new Error('No Purchases found');
    } else {
      return purchases;
    }

  } catch (error){
    res.status(500).json({ error: error.message });
  }
}

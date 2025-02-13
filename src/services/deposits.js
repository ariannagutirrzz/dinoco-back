import { getDepositsFromSupabase } from "../models/deposits.js";

export const getAllDepositsService = async (req, res) => {
  try {
    const deposits = await getDepositsFromSupabase();

    if(!deposits || deposits.length === 0){
      throw new Error('No deposits found');
    } else {
      return deposits;
    }

  } catch (error){
    res.status(500).json({ error: error.message });
  }
}

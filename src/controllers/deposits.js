import { getDepositsFromSupabase } from "../models/deposits.js";

export const getAllDeposits = async (req, res) => {
  try {
    const deposits = await getDepositsFromSupabase();
    res.status(200).json(deposits);
  } catch (error) {
    // console.log("error",error);
    // console.log("error.message",error.message);
    res.status(500).json({ error: error.message });
  }
};

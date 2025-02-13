import { getAllDepositsService } from "../services/deposits.js";

export const getAllDepositsController = async (req, res) => {
  try {
    const deposits = await getAllDepositsService();
    res.status(200).json(deposits);
  } catch (error){
    console.log("error", error);
    console.log("error.message", error.message);
    res.status(500).json({ error: error.message });
  }
}

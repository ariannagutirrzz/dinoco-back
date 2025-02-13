import { getAllPurchasesService } from "../services/purchases.js";

export const getAllPurchasesController = async (req, res) => {
  try {
    const purchases = await getAllPurchasesService();
    res.status(200).json(purchases);
  } catch (error){
    console.log("error", error);
    console.log("error.message", error.message);
    res.status(500).json({ error: error.message });
  }
}

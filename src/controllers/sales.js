import { getAllSalesService } from "../services/sales.js";

export const getAllSalesController = async (req, res) => {
  try {
    const sales = await getAllSalesService();
    res.status(200).json(sales);
  } catch (error){
    console.log("error", error);
    console.log("error.message", error.message);
    res.status(500).json({ error: error.message });
  }
}

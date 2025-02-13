import { getAllClientsService } from "../services/clients.js";

export const getAllClientsController = async (req, res) => {
  try {
    const clients = await getAllClientsService();
    res.status(200).json(clients);
  } catch (error){
    console.log("error", error);
    console.log("error.message", error.message);
    res.status(500).json({ error: error.message });
  }
}
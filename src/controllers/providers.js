import { getAllProvidersService } from "../services/providers.js";

export const getAllProvidersController = async (req, res) => {
  try {
    const providers = await getAllProvidersService();
    res.status(200).json(providers);
  } catch (error){
    console.log("error", error);
    console.log("error.message", error.message);
    res.status(500).json({ error: error.message });
  }
}

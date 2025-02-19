import { getProvidersFromSupabase } from "../models/providers.js";

export const getAllProvidersService = async (req, res) => {
  try {
    const providers = await getProvidersFromSupabase();

    if(!providers || providers.length === 0){
      throw new Error('No providers found');
    } else {
      return providers;
    }

  } catch (error){
    res.status(500).json({ error: error.message });
  }
}

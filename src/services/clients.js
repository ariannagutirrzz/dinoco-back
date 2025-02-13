import { getClientsFromSupabase } from "../models/clients.js";

export const getAllClientsService = async (req, res) => {
  try {
    const clients = await getClientsFromSupabase();

    if(!clients || clients.length === 0){
      throw new Error('No clients found');
    } else {
      return clients;
    }

  } catch (error){
    res.status(500).json({ error: error.message });
  }
}
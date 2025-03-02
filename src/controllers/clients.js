import { 
  deleteOneClientService,
  getAllClientsService,
} from "../services/clients.js";

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

export const deleteOneClientController = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: 'Client ID is required' });
    }

    const deleteClient = await deleteOneClientService(id);

    if (deleteClient) {
      return res.status(200).json({ message: 'Client deleted successfully' });
    } else {
      return res.status(404).json({ message: 'Client not found' });
    }
  } catch (error) {
    console.error('Error deleting client:', error);

    if (error.message.includes('Client not found')) {
      return res.status(404).json({ error: 'Client not found' });
    }

    res.status(500).json({ error: error.message });
  }
};

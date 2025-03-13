import {
  deleteOneClientService,
  getAllClientsService,
  createClientService, 
  updateClientService,
} from "../services/clients.js";

export const getAllClientsController = async (req, res) => {
  try {
    const clients = await getAllClientsService();
    res.status(200).json(clients);
  } catch (error){

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

export const createClientController = async (req, res) => {
  try {
    const { name, id_document, birthday, phone_number, address } = req.body;

    // Validate required fields
    if (!name || !id_document || !birthday || !phone_number || !address) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const clientData = {
      name,
      id_document,
      birthday,
      phone_number,
      address,
    };

    const newClient = await createClientService(clientData);
    return res.status(201).json(newClient);
  } catch (error) {
    console.error('Error creating client:', error);
    return res.status(500).json({ error: error.message });
  }
};

export const updateClientController = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, id_document, birthday, phone_number, address } = req.body;

    if (!name || !id_document || !birthday || !phone_number || !address) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const updatedClient = await updateClientService(id, {
      name,
      id_document,
      birthday,
      phone_number,
      address,
    });

    return res.status(200).json(updatedClient);
  } catch (error) {
    console.error("Error updating client:", error);
    return res.status(500).json({ error: error.message });
  }
};


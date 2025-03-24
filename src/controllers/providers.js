import {
  deleteOneProviderService,
  getAllProvidersService,
  createProviderService, 
  updateProviderService,
} from "../services/providers.js";

export const getAllProvidersController = async (req, res) => {
  try {
    const providers = await getAllProvidersService();
    res.status(200).json(providers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const deleteOneProviderController = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: 'Provider ID is required' });
    }

    const deleteProvider = await deleteOneProviderService(id);

    if (deleteProvider) {
      return res.status(200).json({ message: 'Provider deleted successfully' });
    } else {
      return res.status(404).json({ message: 'Provider not found' });
    }
  } catch (error) {
    console.error('Error deleting provider:', error);

    if (error.message.includes('Provider not found')) {
      return res.status(404).json({ error: 'Provider not found' });
    }

    res.status(500).json({ error: error.message });
  }
};

export const createProviderController = async (req, res) => {
  try {
    const {id_document, name, phone_number, email } = req.body;

    // Validate required fields
    if (!name || !id_document || !name || !phone_number || !email) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const providerData = {
      name,
      id_document,
      name,
      phone_number,
      email,
    };

    const newProvider = await createProviderService(providerData);
    return res.status(201).json(newProvider);
  } catch (error) {
    console.error('Error creating provider:', error);
    return res.status(500).json({ error: error.message });
  }
};

export const updateProviderController = async (req, res) => {

  try {
    const { id } = req.params;
    const { id_document, name, phone_number, email } = req.body;

    if (!id_document || !name || !phone_number || !email) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const updatedProvider = await updateProviderService(id, {
      id_document,
      name,
      phone_number,
      email,
    });

    return res.status(200).json(updatedProvider);
  } catch (error) {
    console.error("Error updating provider:", error);
    return res.status(500).json({ error: error.message });
  }
};

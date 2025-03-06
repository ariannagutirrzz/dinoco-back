import {
  deleteOneProviderService,
  getAllProvidersService,
} from "../services/providers.js";

export const getAllProvidersController = async (req, res) => {
  try {
    const providers = await getAllProvidersService();
    res.status(200).json(providers);
  } catch (error){
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


import { 
  providerExists, 
  getProvidersFromSupabase, 
  deleteProvidersFromSupabase,
} from "../models/providers.js";

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

// DELETE ONE PROVIDER

export const deleteOneProviderService = async (id) => {
  if (!id) {
    throw new Error('Provider ID is required');
  }

  try {
    // Check if the provider exists. This was necessary because Supabase doesn't return an error if the provider doesn't exist, so we have to check it manually from another function (check the model)
    const exists = await providerExists(id);
    if (!exists) {
      throw new Error('Provider not found');
    }

    const { error } = await deleteProvidersFromSupabase(id);

    if (error) {
      throw error;
    }

    // If no error, the deletion was successful
    return true;
  } catch (error) {
    throw new Error('An error occurred: ' + error.message);
  }
};

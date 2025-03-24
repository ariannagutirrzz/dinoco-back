import {
  providerExists,
  getProvidersFromSupabase,
  deleteProvidersFromSupabase,
  createProvider,
  updateProvider,
} from "../models/providers.js";

// GET ALL PROVIDERS

export const getAllProvidersService = async (req, res) => {
  try {
    const providers = await getProvidersFromSupabase();

    if (!providers || providers.length === 0) {
      return [];
    }
    return providers;
  } catch (error) {
    throw new Error('An error occurred: ' + error.message);
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

export const createProviderService = async (providerData) => {
  try {
    if (!providerData || Object.keys(providerData).length === 0) {
      throw new Error('Provider data is required');
    }

    const newProvider = await createProvider(providerData);

    if (!newProvider) {
      throw new Error('Failed to create provider');
    }

    return newProvider;
  } catch (error) {
    console.error('Error in createProviderService:', error);
    throw new Error('An error occurred: ' + error.message);
  }
};

export const updateProviderService = async (id, providerData) => {
  try {
    const updatedProvider = await updateProvider(id, providerData);
    if (!updatedProvider) {
      throw new Error("Failed to update provider");
    }
    return updatedProvider;
  } catch (error) {
    console.error("Error in updateProviderService:", error);
    throw new Error("An error occurred: " + error.message);
  }
};

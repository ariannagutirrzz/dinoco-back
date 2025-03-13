import {
  clientExists,
  getClientsFromSupabase,
  deleteClientsFromSupabase,
  createClient,
  updateClient,
} from "../models/clients.js";

// GET ALL CLIENTS

export const getAllClientsService = async (req, res) => {
  try {
    const clients = await getClientsFromSupabase();

    if(!clients || clients.length === 0){
      return [];
    }
    return clients;
  } catch (error){
    throw new Error('An error occurred: ' + error.message);
  }
}

// DELETE ONE CLIENT

export const deleteOneClientService = async (id) => {
  if (!id) {
    throw new Error('Client ID is required');
  }

  try {
    // Check if the product exists. This was necessary because Supabase doesn't return an error if the product doesn't exist, so we have to check it manually from another function (check the model)
    const exists = await clientExists(id);
    if (!exists) {
      throw new Error('Client not found');
    }

    const { error } = await deleteClientsFromSupabase(id);

    if (error) {
      throw error;
    }

    // If no error, the deletion was successful
    return true;
  } catch (error) {
    throw new Error('An error occurred: ' + error.message);
  }
};

export const createClientService = async (clientData) => {
  try {
    if (!clientData || Object.keys(clientData).length === 0) {
      throw new Error('Client data is required');
    }

    const newClient = await createClient(clientData);

    if (!newClient) {
      throw new Error('Failed to create client');
    }

    return newClient;
  } catch (error) {
    console.error('Error in createClientService:', error);
    throw new Error('An error occurred: ' + error.message);
  }
};

export const updateClientService = async (id, clientData) => {
  try {
    const updatedClient = await updateClient(id, clientData);
    if (!updatedClient) {
      throw new Error("Failed to update client");
    }
    return updatedClient;
  } catch (error) {
    console.error("Error in updateClientService:", error);
    throw new Error("An error occurred: " + error.message);
  }
};


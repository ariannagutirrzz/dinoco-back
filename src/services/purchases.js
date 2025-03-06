import {
  purchaseExists,
  deletePurchasesFromSupabase,
  getPurchasesFromSupabase } from "../models/purchases.js";

// GET ALL PURCHASES

export const getAllPurchasesService = async (req, res) => {
  try {
    const purchases = await getPurchasesFromSupabase();

    if(!purchases || purchases.length === 0){
     return []
    }

    return purchases
  } catch (error){
    throw new Error('An error occurred: ' + error.message);
  }
}

// DELETE ONE PURCHASE

export const deleteOnePurchaseService = async (id) => {
  if (!id) {
    throw new Error('Purchase ID is required');
  }

  try {
    // Check if the purchase exists. This was necessary because Supabase doesn't return an error if the purchase doesn't exist, so we have to check it manually from another function (check the model)
    const exists = await purchaseExists(id);
    if (!exists) {
      throw new Error('Purchase not found');
    }

    const { error } = await deletePurchasesFromSupabase(id);

    if (error) {
      throw error;
    }

    // If no error, the deletion was successful
    return true;
  } catch (error) {
    throw new Error('An error occurred: ' + error.message);
  }
};

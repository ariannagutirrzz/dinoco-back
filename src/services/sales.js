import {
  salesExists,
  deleteSalesFromSupabase,
  getSalesFromSupabase
 } from "../models/sales.js";

export const getAllSalesService = async (req, res) => {
  try {
    const sales = await getSalesFromSupabase();

    if(!sales || sales.length === 0){
      return [];
    }

    return sales
  } catch (error){
    throw new Error('An error occurred: ' + error.message);
  }
}

// DELETE ONE SALE

export const deleteOneSaleService = async (id) => {
  if (!id) {
    throw new Error('Sale ID is required');
  }

  try {
    // Check if the sale exists. This was necessary because Supabase doesn't return an error if the sale doesn't exist, so we have to check it manually from another function (check the model)
    const exists = await salesExists(id);
    if (!exists) {
      throw new Error('Sale not found');
    }

    const { error } = await deleteSalesFromSupabase(id);

    if (error) {
      throw error;
    }

    // If no error, the deletion was successful
    return true;
  } catch (error) {
    throw new Error('An error occurred: ' + error.message);
  }
};

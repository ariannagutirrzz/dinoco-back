import {
  saleExists,
  getSalesFromSupabase,
  deleteSalesFromSupabase,
  createSale,
  updateSale,
} from "../models/sales.js";

// GET ALL SALES
export const getAllSalesService = async (req, res) => {
  try {
    const sales = await getSalesFromSupabase();

    if (!sales || sales.length === 0) {
      return [];
    }
    return sales;
  } catch (error) {
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
    const exists = await saleExists(id);
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

// CREATE SALE
export const createSaleService = async (saleData) => {
  try {
    if (!saleData || Object.keys(saleData).length === 0) {
      throw new Error('Sale data is required');
    }

    const newSale = await createSale(saleData);

    if (!newSale) {
      throw new Error('Failed to create sale');
    }

    return newSale;
  } catch (error) {
    console.error('Error in createSaleService:', error);
    throw new Error('An error occurred: ' + error.message);
  }
};

// UPDATE SALE
export const updateSaleService = async (id, saleData) => {
  try {
    const updatedSale = await updateSale(id, saleData);
    if (!updatedSale) {
      throw new Error("Failed to update sale");
    }
    return updatedSale;
  } catch (error) {
    console.error("Error in updateSaleService:", error);
    throw new Error("An error occurred: " + error.message);
  }
};

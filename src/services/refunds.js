import {
    refundExists,
    deleteRefundsFromSupabase,
    getRefundsFromSupabase
  } from "../models/refunds.js";
  
  //  GET ALL REFUNDS
  
  export const getAllRefundsService = async (req, res) => {
    try {
      const refunds = await getRefundsFromSupabase();
  
      if (!refunds || refunds.length === 0) {
        return [];
      }
      return refunds;
    } catch (error) {
      throw new Error('An error occurred: ' + error.message);
    }
  }
  
  // DELETE ONE REFUND
  
  export const deleteOneRefundService = async (id) => {
    if (!id) {
      throw new Error('Refund ID is required');
    }
  
    try {
      // Check if the refund exists. This was necessary because Supabase doesn't return an error if the refund doesn't exist, so we have to check it manually from another function (check the model)
      const exists = await refundExists(id);
      if (!exists) {
        throw new Error('Refund not found');
      }
  
      const { error } = await deleteRefundsFromSupabase(id);
  
      if (error) {
        throw error;
      }
  
      // If no error, the deletion was successful
      return true;
    } catch (error) {
      throw new Error('An error occurred: ' + error.message);
    }
  };
  
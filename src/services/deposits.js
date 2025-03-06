import {
  depositExists,
  deleteDepositsFromSupabase,
  getDepositsFromSupabase
} from "../models/deposits.js";

//  GET ALL DEPOSITS

export const getAllDepositsService = async (req, res) => {
  try {
    const deposits = await getDepositsFromSupabase();

    if(!deposits || deposits.length === 0){
      return []
    }
    return deposits;
  } catch (error){
    throw new Error('An error occurred: ' + error.message);
  }
}

// DELETE ONE DEPOSIT

export const deleteOneDepositService = async (id) => {
  if (!id) {
    throw new Error('Deposit ID is required');
  }

  try {
    // Check if the deposit exists. This was necessary because Supabase doesn't return an error if the deposit doesn't exist, so we have to check it manually from another function (check the model)
    const exists = await depositExists(id);
    if (!exists) {
      throw new Error('Deposit not found');
    }

    const { error } = await deleteDepositsFromSupabase(id);

    if (error) {
      throw error;
    }

    // If no error, the deletion was successful
    return true;
  } catch (error) {
    throw new Error('An error occurred: ' + error.message);
  }
};


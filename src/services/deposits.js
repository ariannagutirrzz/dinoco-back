import { 
  depositExists,
  deleteDepositsFromSupabase,
  getDepositsFromSupabase 
} from "../models/deposits.js";

export const getAllDepositsService = async (req, res) => {
  try {
    const deposits = await getDepositsFromSupabase();

    if(!deposits || deposits.length === 0){
      throw new Error('No deposits found');
    } else {
      return deposits;
    }

  } catch (error){
    res.status(500).json({ error: error.message });
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


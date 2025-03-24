import {
  depositExists,
  getDepositsFromSupabase,
  deleteDepositsFromSupabase,
  createDeposit,
  updateDeposit,
} from "../models/deposits.js";

// GET ALL DEPOSITS

export const getAllDepositsService = async (req, res) => {
  try {
    const deposits = await getDepositsFromSupabase();

    if (!deposits || deposits.length === 0) {
      return [];
    }
    return deposits;
  } catch (error) {
    throw new Error('An error occurred: ' + error.message);
  }
};

// DELETE ONE DEPOSIT

export const deleteOneDepositService = async (id) => {
  if (!id) {
    throw new Error('Deposit ID is required');
  }

  try {
    // Check if the deposit exists. This is necessary because Supabase doesn't return an error if the deposit doesn't exist, so we verify manually.
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

// CREATE A DEPOSIT

export const createDepositService = async (depositData) => {
  try {
    if (!depositData || Object.keys(depositData).length === 0) {
      throw new Error('Deposit data is required');
    }

    const newDeposit = await createDeposit(depositData);

    if (!newDeposit) {
      throw new Error('Failed to create deposit');
    }

    return newDeposit;
  } catch (error) {
    console.error('Error in createDepositService:', error);
    throw new Error('An error occurred: ' + error.message);
  }
};

// UPDATE A DEPOSIT

export const updateDepositService = async (id, depositData) => {
  try {
    const updatedDeposit = await updateDeposit(id, depositData);
    if (!updatedDeposit) {
      throw new Error("Failed to update deposit");
    }
    return updatedDeposit;
  } catch (error) {
    console.error("Error in updateDepositService:", error);
    throw new Error("An error occurred: " + error.message);
  }
};

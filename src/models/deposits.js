import supabase from '../config/supabaseClient.js';

export async function getDepositsFromSupabase() {
  let { data: depositos, error } = await supabase.from('deposits').select('*');

  if (error) {
    console.error('Error fetching deposits:', error);
    return [];
  }
  return depositos;
}

// Check if a deposit exists so we can delete it (if we don't check and try to delete a deposit that doesn't exist, Supabase will return a success message, but the deposit won't be deleted)
export const depositExists = async (id) => {
  try {
    const { data, error } = await supabase
      .from('deposits')
      .select('*')
      .eq('id', id)
      .single();

    // If no rows are found, Supabase throws an error that was confusing, so I added this check to return false instead of throwing an error
    if (error && error.code === 'PGRST116') {
      return false; // No rows found
    }

    if (error) {
      throw error; // Throw other errors
    }

    return !!data; // Return true if the deposit exists (using !! to convert the value to a boolean)
  } catch (error) {
    console.error('Error checking if deposit exists:', error);
    throw error;
  }
};

// DELETE A DEPOSIT FROM SUPABASE
export const deleteDepositsFromSupabase = async (id) => {
  try {
    const { data, error } = await supabase
      .from('deposits')
      .delete()
      .eq('id', id);

    return { data, error };
  } catch (error) {
    console.error('Error deleting deposit:', error);
    throw error;
  }
};

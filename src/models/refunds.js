import supabase from '../config/supabaseClient.js';

export async function getRefundsFromSupabase() {
  let { data: refunds, error } = await supabase.from('refunds').select('*');

  if (error) {
    console.error('Error fetching refunds:', error);
    return [];
  }
  return refunds;
}

// Check if a refund exists so we can delete it (if we don't check and try to delete a refund that doesn't exist, Supabase will return a success message, but the refund won't be deleted)
export const refundExists = async (id) => {
  try {
    const { data, error } = await supabase
      .from('refunds')
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

    return !!data; // Return true if the refund exists (using !! to convert the value to a boolean)
  } catch (error) {
    console.error('Error checking if refund exists:', error);
    throw error;
  }
};

// DELETE A REFUND FROM SUPABASE
export const deleteRefundsFromSupabase = async (id) => {
  try {
    const { data, error } = await supabase
      .from('refunds')
      .delete()
      .eq('id', id);

    return { data, error };
  } catch (error) {
    console.error('Error deleting refund:', error);
    throw error;
  }
};

import supabase from '../config/supabaseClient.js';

export async function getPurchasesFromSupabase() {
  let { data: purchases, error } = await supabase.from('purchases').select('*');

  if (error) {
    console.error('Error fetching purchases:', error);
    return [];
  }
  return purchases;
}

// Check if a purchase exists so we can delete it (if we don't check and try to delete a purchase that doesn't exist, Supabase will return a success message, but the purchase won't be deleted)
export const purchaseExists = async (id) => {
  try {
    const { data, error } = await supabase
      .from('purchases')
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

    return !!data; // Return true if the purchase exists (using !! to convert the value to a boolean)
  } catch (error) {
    console.error('Error checking if purchase exists:', error);
    throw error;
  }
};

// DELETE A PURCHASE FROM SUPABASE
export const deletePurchasesFromSupabase = async (id) => {
  try {
    const { data, error } = await supabase
      .from('purchases')
      .delete()
      .eq('id', id);

    return { data, error };
  } catch (error) {
    console.error('Error deleting purchase:', error);
    throw error;
  }
};

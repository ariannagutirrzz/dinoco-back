import supabase from '../config/supabaseClient.js';

export async function getSalesFromSupabase() {
  let { data: sales, error } = await supabase
    .from("sales")
    .select(`
      id,
      quantity,
      total_price,
      product,
      sale_date,
      client_id,
      clients (address, name, phone_number, birthday),
      id_seller,
      users (name)
    `);

  if (error) {
    console.error("Error fetching sales:", error);
    return [];
  }

  return sales;
}

// Check if a sale exists so we can delete it (if we don't check and try to delete a sale that doesn't exist, Supabase will return a success message, but the sale won't be deleted)
export const salesExists = async (id) => {
  try {
    const { data, error } = await supabase
      .from('sales') // Change table name to 'sales'
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

    return !!data; // Return true if the sale exists (using !! to convert the value to a boolean)
  } catch (error) {
    console.error('Error checking if sale exists:', error);
    throw error;
  }
};

// DELETE A SALE FROM SUPABASE
export const deleteSalesFromSupabase = async (id) => {
  try {
    const { data, error } = await supabase
      .from('sales') // Change table name to 'sales'
      .delete()
      .eq('id', id);

    return { data, error };
  } catch (error) {
    console.error('Error deleting sale:', error);
    throw error;
  }
};

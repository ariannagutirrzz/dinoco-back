import supabase from '../config/supabaseClient.js';

// Get all sales from Supabase
export async function getSalesFromSupabase() {
  let { data: sales, error } = await supabase.from('sales').select(`
    id,
    quantity,
    total_price,
    product,
    sale_date,
    client_id,
    clients (address, name, phone_number, birthday),
    id_seller,
    users (name)
  `);;

  if (error) {
    console.error('Error fetching sales:', error);
    return [];
  }
  return sales;
}

// Check if a sale exists by ID
export const saleExists = async (id) => {
  try {
    const { data, error } = await supabase
      .from('sales')
      .select('*')
      .eq('id', id)
      .single();

    if (error && error.code === 'PGRST116') {
      return false; // No rows found
    }

    if (error) {
      throw error;
    }

    return !!data; // Return true if the sale exists
  } catch (error) {
    console.error('Error checking if sale exists:', error);
    throw error;
  }
};

// Delete a sale from Supabase by ID
export const deleteSalesFromSupabase = async (id) => {
  try {
    const { data, error } = await supabase
      .from('sales')
      .delete()
      .eq('id', id);

    return { data, error };
  } catch (error) {
    console.error('Error deleting sale:', error);
    throw error;
  }
};

// Create a new sale in Supabase
export const createSale = async (saleData) => {
  try {
    const { data, error } = await supabase
      .from('sales')
      .insert([saleData])
      .select(); // Use .select() to return the inserted record

    if (error) {
      console.error('Supabase error:', error);
      throw new Error(error.message);
    }

    return data ? data[0] : null;
  } catch (error) {
    console.error('Error in createSale (model):', error);
    throw error;
  }
};

// Update an existing sale in Supabase
export const updateSale = async (id, saleData) => {
  try {
    const { data, error } = await supabase
      .from('sales')
      .update(saleData)
      .eq('id', id)
      .select();

    if (error) {
      console.error('Supabase error:', error);
      throw new Error(error.message);
    }

    return data ? data[0] : null;
  } catch (error) {
    console.error('Error updating sale:', error);
    throw error;
  }
};

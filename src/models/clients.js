import supabase from '../config/supabaseClient.js';

export async function getClientsFromSupabase() {
  let { data: clientes, error } = await supabase.from('clients').select('*');

  if (error) {
    console.error('Error fetching clients:', error);
    return [];
  }
  return clientes;
}

// Check if a product exists so we can delete it (if we dont check and try to delete a product that doesn't exist, Supabase will return a success message, but the product won't be deleted)
export const clientExists = async (id) => {
  try {
    const { data, error } = await supabase
      .from('clients')
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

    return !!data; // Return true if the product exists (using !! to convert the value to a boolean)
  } catch (error) {
    console.error('Error checking if clients exists:', error);
    throw error;
  }
};

// DELETE A CLIENT FROM SUPABASE
export const deleteClientsFromSupabase = async (id) => {
  try {
    const { data, error } = await supabase
      .from('clients')
      .delete()
      .eq('id', id);

    return { data, error };
  } catch (error) {
    console.error('Error deleting client:', error);
    throw error;
  }
};
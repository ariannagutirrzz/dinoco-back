import supabase from '../config/supabaseClient.js';

export async function getProvidersFromSupabase() {
  let { data: providers, error } = await supabase.from('providers').select('*');

  if (error) {
    console.error('Error fetching providers:', error);
    return [];
  }
  return providers;
}

// Check if a provider exists so we can delete it (if we don't check and try to delete a provider that doesn't exist, Supabase will return a success message, but the provider won't be deleted)
export const providerExists = async (id) => {
  try {
    const { data, error } = await supabase
      .from('providers')
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

    return !!data; // Return true if the provider exists (using !! to convert the value to a boolean)
  } catch (error) {
    console.error('Error checking if provider exists:', error);
    throw error;
  }
};

// DELETE A PROVIDER FROM SUPABASE
export const deleteProvidersFromSupabase = async (id) => {
  try {
    const { data, error } = await supabase
      .from('providers')
      .delete()
      .eq('id', id);

    return { data, error };
  } catch (error) {
    console.error('Error deleting provider:', error);
    throw error;
  }
};

export const createProvider = async (providerData) => {
  try {
    const { data, error } = await supabase
      .from('providers')
      .insert([providerData])
      .select(); // Use .select() to return the inserted record

    if (error) {
      console.error('Supabase error:', error);
      throw new Error(error.message);
    }

    return data ? data[0] : null;
  } catch (error) {
    console.error('Error in createProvider (model):', error);
    throw error;
  }
};

// UPDATE A PROVIDER IN SUPABASE
export const updateProvider = async (id, providerData) => {
  try {
    const { data, error } = await supabase
      .from('providers')
      .update(providerData)
      .eq('id', id)
      .select();

    if (error) {
      console.error('Supabase error:', error);
      throw new Error(error.message);
    }

    return data ? data[0] : null;
  } catch (error) {
    console.error('Error updating provider:', error);
    throw error;
  }
};

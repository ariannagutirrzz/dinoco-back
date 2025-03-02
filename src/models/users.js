import supabase from '../config/supabaseClient.js';

export async function getUsersFromSupabase() {
  let { data: users, error } = await supabase.from('users').select('*');

  if (error) {
    console.error('Error fetching users:', error);
    return [];
  }
  return users;
}

export async function findById(id) {
  let { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching user:', error);
    return null;
  }
  return data;
}

export async function findByEmail(email) {
  let { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single();

  if (error) {
    console.error('Error fetching user:', error);
    return null;
  }
  return data;
}

// Check if a user exists so we can delete it (if we don't check and try to delete a user that doesn't exist, Supabase will return a success message, but the user won't be deleted)
export const userExists = async (id) => {
  try {
    const { data, error } = await supabase
      .from('users')
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

    return !!data; // Return true if the user exists (using !! to convert the value to a boolean)
  } catch (error) {
    console.error('Error checking if user exists:', error);
    throw error;
  }
};

// DELETE A USER FROM SUPABASE
export const deleteUsersFromSupabase = async (id) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .delete()
      .eq('id', id);

    return { data, error };
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

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

// CREATE A USER IN SUPABASE
export const createUser = async (userData) => {
  try {
    const { data, error } = await supabase
      .from('users') // Changed from 'clients' to 'users'
      .insert([userData])
      .select(); // Use .select() to return the inserted record

    if (error) {
      console.error('Supabase error:', error);
      throw new Error(error.message);
    }

    return data ? data[0] : null;
  } catch (error) {
    console.error('Error in createUser (model):', error);
    throw error;
  }
};

// UPDATE A USER IN SUPABASE
export const updateUser = async (id, userData) => {
  try {
    const { data, error } = await supabase
      .from('users') // Changed from 'clients' to 'users'
      .update(userData)
      .eq('id', id)
      .select();

    if (error) {
      console.error('Supabase error:', error);
      throw new Error(error.message);
    }

    return data ? data[0] : null;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

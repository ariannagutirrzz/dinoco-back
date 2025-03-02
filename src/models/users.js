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

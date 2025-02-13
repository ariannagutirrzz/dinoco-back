import supabase from '../config/supabaseClient.js';

export async function getUsersFromSupabase() {
  let { data: users, error } = await supabase.from('users').select('*');

  if (error) {
    console.error('Error fetching users:', error);
    return [];
  }
  return users;
}

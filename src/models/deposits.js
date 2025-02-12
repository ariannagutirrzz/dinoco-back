import supabase from '../config/supabaseClient.js';

export async function getDepositsFromSupabase() {
  let { data: depositos, error } = await supabase.from('deposits').select('*');

  if (error) {
    console.error('Error fetching deposits:', error);
    return [];
  }
  return depositos;
}
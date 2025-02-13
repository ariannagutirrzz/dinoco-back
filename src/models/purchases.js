import supabase from '../config/supabaseClient.js';

export async function getPurchasesFromSupabase() {
  let { data: purchases, error } = await supabase.from('purchases').select('*');

  if (error) {
    console.error('Error fetching purchases:', error);
    return [];
  }
  return purchases;
}
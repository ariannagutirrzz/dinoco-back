import supabase from '../config/supabaseClient.js';

export async function getSalesFromSupabase() {
  let { data: sales, error } = await supabase.from('sales').select('*');

  if (error) {
    console.error('Error fetching sales:', error);
    return [];
  }
  return sales;
}
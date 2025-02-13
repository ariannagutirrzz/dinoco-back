import supabase from '../config/supabaseClient.js';

export async function getProvidersFromSupabase() {
  let { data: providers, error } = await supabase.from('providers').select('*');

  if (error) {
    console.error('Error fetching providers:', error);
    return [];
  }
  return providers;
}
import supabase from '../config/supabaseClient.js';

export async function getClientsFromSupabase() {
  let { data: clientes, error } = await supabase.from('clients').select('*');

  if (error) {
    console.error('Error fetching clients:', error);
    return [];
  }
  return clientes;
}
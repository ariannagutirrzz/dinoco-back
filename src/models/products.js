import supabase from '../config/supabaseClient.js';

export async function getProductsFromSupabase() {
  let { data: productos, error } = await supabase.from('products').select('*');

  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }
  return productos;
}

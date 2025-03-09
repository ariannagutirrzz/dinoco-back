import supabase from '../config/supabaseClient.js';

// GET ALL PRODUCTS FROM SUPABASE
export async function getProductsFromSupabase() {
  let { data: productos, error } = await supabase.from('products').select('*');

  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }
  return productos;
}

// Check if a product exists so we can delete it (if we dont check and try to delete a product that doesn't exist, Supabase will return a success message, but the product won't be deleted)
export const productExists = async (id) => {
  try {
    const { data, error } = await supabase
      .from('products')
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

    return !!data; // Return true if the product exists (using !! to convert the value to a boolean)
  } catch (error) {
    console.error('Error checking if product exists:', error);
    throw error;
  }
};

// DELETE A PRODUCT FROM SUPABASE
export const deleteProductFromSupabase = async (id) => {
  try {
    const { data, error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    return { data, error };
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};
export const createProduct = async (productData) => {
  console.log('Product data in model:', productData);

  try {
    // Insert the product (sin verificar autenticación)
    const { data, error } = await supabase
      .from('products')
      .insert([productData])
      .select(); // Use .select() to return the inserted record

    if (error) {
      console.error('Supabase error:', error);
      throw new Error(error.message);
    }

    console.log('Product created in model:', data);
    return data ? data[0] : null; // Return the newly created product
  } catch (error) {
    console.error('Error in createProduct (model):', error);
    throw error;
  }
};

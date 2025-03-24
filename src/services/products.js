import supabase from '../config/supabaseClient.js';

// Get all products from Supabase
export const getAllProductsService = async () => {
  let { data: products, error } = await supabase.from('products').select('*');

  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }
  return products;
};

// Check if a product exists by ID
export const productExists = async (id) => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (error && error.code === 'PGRST116') {
      return false; // No rows found
    }

    if (error) {
      throw error;
    }

    return !!data; // Return true if the product exists
  } catch (error) {
    console.error('Error checking if product exists:', error);
    throw error;
  }
};

// Delete a product from Supabase by ID
export const deleteOneProductService = async (id) => {
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

// Create a new product in Supabase
export const createProductService = async (productData) => {
  try {
    const { data, error } = await supabase
      .from('products')
      .insert([productData])
      .select(); // Use .select() to return the inserted record

    if (error) {
      console.error('Error creating product:', error);
      throw new Error(error.message);
    }

    return data ? data[0] : null;
  } catch (error) {
    console.error('Error in createProduct (model):', error);
    throw error;
  }
};

// Update an existing product in Supabase
export const updateProductService = async (id, productData) => {
  try {
    const { data, error } = await supabase
      .from('products')
      .update(productData)
      .eq('id', id)
      .select();

    if (error) {
      console.error('Error updating product:', error);
      throw new Error(error.message);
    }

    return data ? data[0] : null;
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

// Update the stock quantity of a product
export const updateProductStock = async (productId, newQuantity) => {
  try {
    const { data, error } = await supabase
      .from('products')
      .update({ quantity: newQuantity })
      .eq('id', productId)
      .select(); // Use .select() to get the updated record

    if (error) {
      console.error('Error updating product stock:', error);
      throw error;
    }

    return data ? data[0] : null;
  } catch (error) {
    console.error('Error updating product stock:', error);
    throw error;
  }
};

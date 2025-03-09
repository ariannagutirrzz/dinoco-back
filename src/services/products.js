import {
  getProductsFromSupabase,
  productExists,
  deleteProductFromSupabase,
  createProduct,
} from '../models/products.js';

//  GET ALL PRODUCTS

export const getAllProductsService = async (req, res) => {
  try {
    const products = await getProductsFromSupabase();

    if (!products || products.length === 0) {
      return [];
    }
    return products;
  } catch (error) {
    throw new Error('An error occurred: ' + error.message);
  }
};

// DELETE ONE PRODUCT

export const deleteOneProductService = async (id) => {
  if (!id) {
    throw new Error('Product ID is required');
  }

  try {
    // Check if the product exists. This was necessary because Supabase doesn't return an error if the product doesn't exist, so we have to check it manually from another function (check the model)
    const exists = await productExists(id);
    if (!exists) {
      throw new Error('Product not found');
    }

    const { error } = await deleteProductFromSupabase(id);

    if (error) {
      throw error;
    }

    // If no error, the deletion was successful
    return true;
  } catch (error) {
    throw new Error('An error occurred: ' + error.message);
  }
};

export const createProductService = async (productData) => {
  console.log('Product data in service:', productData);
  try {
    if (!productData || Object.keys(productData).length === 0) {
      throw new Error('Product data is required');
    }

    const newProduct = await createProduct(productData);
    console.log('New product in service:', newProduct);

    if (!newProduct) {
      throw new Error('Failed to create product');
    }

    return newProduct;
  } catch (error) {
    console.error('Error in createProductService:', error);
    throw new Error('An error occurred: ' + error.message);
  }
};

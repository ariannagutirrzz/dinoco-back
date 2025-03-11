import supabase from '../config/supabaseClient.js';

export const getCategories = async () => {
  try {
    const { data, error } = await supabase.from('categories').select('*');
    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

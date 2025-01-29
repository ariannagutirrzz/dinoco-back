import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

console.log('supabaseUrl', process.env.SUPABASE_URL);
console.log('supabaseKey', process.env.SUPABASE_KEY);

// Load environment variables
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

// Create the Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

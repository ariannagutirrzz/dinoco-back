import supabase from '../config/supabaseClient.js';

export class AuthService {
  static async signUp(email, password) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) throw error;
    return data;
  }

  static async signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return data;
  }

  static async getCurrentUser(token) {
    const { data, error } = await supabase.auth.getUser(token);

    if (error) throw error;
    return data.user;
  }
}

// fes

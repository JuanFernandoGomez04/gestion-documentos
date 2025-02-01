import { supabase } from '../config/supabase';

export const signIn = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      if (error.message === 'Invalid login credentials') {
        throw new Error('El correo electrónico o la contraseña son incorrectos');
      }
      throw new Error('Error al iniciar sesión: ' + error.message);
    }

    return data;
  } catch (error: any) {
    console.error('Error de autenticación:', error);
    throw error;
  }
};

export const signUp = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password
    });

    if (error) {
      if (error.message.includes('Email already registered')) {
        throw new Error('Este correo electrónico ya está registrado');
      }
      throw new Error('Error al registrarse: ' + error.message);
    }

    return data;
  } catch (error: any) {
    console.error('Error de registro:', error);
    throw error;
  }
};
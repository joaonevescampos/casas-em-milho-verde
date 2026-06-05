import { supabase } from "../lib/supabase";

export const loginToAdmin = async () => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: import.meta.env.VITE_LOGIN_EMAIL,
      password: import.meta.env.VITE_LOGIN_PASSWORD,
    });

    if (error) {
      console.error(error);
    } else {
      console.log("Usuário logado:", data.user);
    }
  } catch (error) {
    Error(`Cannot login in the admin dashboard. Error: ${error}`);
  }
};

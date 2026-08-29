import { supabase } from "../lib/supabase";
const { data: { user } } = await supabase.auth.getUser();

if (user) {
  console.log("✅ Usuário autenticado:", user.email);
} else {
  console.log("❌ Usuário NÃO autenticado");
}

export const loginToAdmin = async (
  email: string,
  password: string
) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.log(error.message)
    throw new Error(error.message);
  }

  return data.user;
};
import { createClient } from "@supabase/supabase-js";

// Certifique-se de que estas variáveis de ambiente estão definidas
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Variáveis de ambiente SUPABASE_URL ou SUPABASE_ANON_KEY não estão definidas.");
  // Em um ambiente de produção, você pode querer lançar um erro ou lidar com isso de forma mais robusta.
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
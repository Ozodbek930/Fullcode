import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://toubsqynbnrmthscrbba.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRvdWJzcXluYm5ybXRoc2NyYmJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkyNTgwNTAsImV4cCI6MjA1NDgzNDA1MH0.Hh6zZM00KuGwkVKMSjrgzy1K1yrjXR8J2JH4z6a4KxU";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

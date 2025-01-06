// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ujnjjsfskkjgnzbsfzkl.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVqbmpqc2Zza2tqZ256YnNmemtsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzAxNDE1NTcsImV4cCI6MjA0NTcxNzU1N30.O6oHSBRoDn_m3ia7et2Hkh79mXaflwbhWGqX-N1galk';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

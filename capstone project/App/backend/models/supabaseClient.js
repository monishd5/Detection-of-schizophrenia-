// supabaseClient.js
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config(); // Load environment variables from .env file

const supabaseUrl = process.env.SUPABASE_URL; // Use environment variable
const supabaseKey = process.env.SUPABASE_ANON_KEY; // Use environment variable

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase; // Export the Supabase client

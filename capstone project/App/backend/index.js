require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
app.use(cors());
app.use(express.json()); // Parse incoming JSON

// Supabase setup
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Middleware to log requests


app.use((req, res, next) => {
  console.log(`${req.method} request to ${req.url}`);
  next();
});

// app.get('/', (req, res) => {
//   res.send('Welcome to the API server. Use specific endpoints.');
// });

// Route: Patient Signup
app.post('/patient-signup', async (req, res) => {
  const { name, email, password } = req.body;

  const { data: user, error: signupError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (signupError) return res.status(400).json({ error: signupError.message });

  const { error: insertError } = await supabase
    .from('patients')
    .insert([{ id: user.user.id, email, name }]);

  if (insertError) return res.status(400).json({ error: insertError.message });

  res.status(200).json({ message: 'Patient signup successful', user: user.user });
});

// Route: Patient Login
app.post('/patient-login', async (req, res) => {
  const { email, password } = req.body;

  const { data: user, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) return res.status(400).json({ error: error.message });

  res.status(200).json({ message: 'Patient login successful', user });
});

// Route: Doctor Signup
app.post('/doctor-signup', async (req, res) => {
  const { name, email, password } = req.body;

  const { data: user, error: signupError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (signupError) return res.status(400).json({ error: signupError.message });

  const { error: insertError } = await supabase
    .from('doctors')
    .insert([{ id: user.user.id, email, name }]);

  if (insertError) return res.status(400).json({ error: insertError.message });

  res.status(200).json({ message: 'Doctor signup successful', user: user.user });
});

// Route: Doctor Login
app.post('/doctor-login', async (req, res) => {
  const { email, password } = req.body;

  const { data: user, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) return res.status(400).json({ error: error.message });

  res.status(200).json({ message: 'Doctor login successful', user });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

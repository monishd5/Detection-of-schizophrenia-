import React, { useState } from 'react';
import './plogin.css';
import { supabase } from './supabaseClient';
import { useNavigate } from 'react-router-dom';

const PatientLoginSignup = () => {
    const [isSignIn, setIsSignIn] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const role = 'patient';

    const navigate = useNavigate();

    const handleSignIn = () => setIsSignIn(true);
    const handleSignUp = () => setIsSignIn(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            // Display error for incorrect email/password
            alert(`Login Error: ${error.message}`);
        } else {
            // Verify if the logged-in user is in the doctors table
            const { data: patientData, error: patientError } = await supabase
                .from('patients')
                .select('id')
                .eq('id', data.user.id)
                .single();
    
            if (patientError || !patientData) {
                alert('No such user exists in the Patient records.');
                await supabase.auth.signOut();  // Log out user immediately
            } else {
                // Successful doctor login
                alert(`Welcome,  ${data.user.email}`);
                navigate('/home');
            }
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();

        // Sign up the user
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: { name }, // Save the name in user metadata
            },
        });

        if (error) {
            alert(`Signup Error: ${error.message}`);
        } else {
            // Insert user role into the user_profiles table
            const { error: insertError } = await supabase
                .from('user_profiles')
                .insert([{ id: data.user.id, role, name }]); // Insert role and name
    
            // Insert user data into the patients table
            const { error: insertError2 } = await supabase
                .from('patients')
                .insert([{ id: data.user.id, email, name }]);
    
            // Handle errors for each insertion separately
            if (insertError) {
                alert(`Error saving role in user_profiles: ${insertError.message}`);
            }
            
            if (insertError2) {
                alert(`Error saving data in patients: ${insertError2.message}`);
            }
    
            // Only navigate if both insertions succeeded
            if (!insertError && !insertError2) {
                alert(`Account created for: ${data.user.email}`);
                navigate('/home'); // Navigate after successful signup and role insertion
            }
        }
    };

    return (


        <div className="eve">
        <div className={`plogin-container ${isSignIn ? '' : 'right-panel-active'}`}>
            <div className="plogin-form-container plogin-sign-in-container">
                <form onSubmit={handleLogin}>
                    <h1 className="plogin-h1">Log in</h1>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Log In</button>
                </form>
            </div>

            <div className="plogin-form-container plogin-sign-up-container">
                <form onSubmit={handleSignup}>
                    <h1 className="plogin-h1">Create Account</h1>
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {/* Role selection dropdown */}
                    {/* <select value={role} onChange={(e) => setRole(e.target.value)} required>
                        <option value="patient">Patient</option>
                        <option value="doctor">Doctor</option>
                    </select> */}
                    <button type="submit">Sign Up</button>
                </form>
            </div>

            <div className="plogin-overlay-container">
                <div className="plogin-overlay">
                    <div className="plogin-overlay-panel plogin-overlay-right">
                        <h1 className="plogin-h1">Don't worry if you have schizo!</h1>
                        <p>Because you are not always alone.</p>
                        <button className="plogin-ghost" onClick={handleSignUp}>
                            Sign Up
                        </button>
                    </div>
                    <div className="plogin-overlay-panel plogin-overlay-left">
                        <h1 className="plogin-h1">Welcome Back!</h1>
                        <p>Log in with your credentials</p>
                        <button className="plogin-ghost" onClick={handleSignIn}>
                            Log In
                        </button>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
};

export default PatientLoginSignup;

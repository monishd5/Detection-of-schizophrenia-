import React, { useState } from 'react';
import './DLoginSignup.css'; // Import the CSS file
import { supabase } from './supabaseClient'; // Import Supabase client
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const PatientLoginSignup = () => {
    const [isSignIn, setIsSignIn] = useState(true); // Manage toggle state
    const [email, setEmail] = useState(''); // State for email
    const [password, setPassword] = useState(''); // State for password
    const [name, setName] = useState(''); // State for name (signup)
    
    // Initialize useNavigate within the component
    const navigate = useNavigate();

    // Event handlers for switching views
    const handleSignIn = () => setIsSignIn(true);
    const handleSignUp = () => setIsSignIn(false);

    // Handle login submission with Supabase
    const handleLogin = async (e) => {
        e.preventDefault();
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            alert(`Login Error: ${error.message}`);
        } else {
            alert(`Welcome Patient: ${data.user.email}`);
            navigate('/home'); // Navigate after successful login
        }
    };

    // Handle signup submission with Supabase
    const handleSignup = async (e) => {
        e.preventDefault();
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
            alert(`Account created for: ${data.user.email}`);
            // navigate('/home'); // Navigate after successful signup
        }
    };

    return (
        <div className={`container ${isSignIn ? '' : 'right-panel-active'}`}>
            {/* Sign-In Form */}
            <div className="form-container sign-in-container">
                <form onSubmit={handleLogin}>
                    <h1>Log in as Patient</h1>
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

            {/* Sign-Up Form */}
            <div className="form-container sign-up-container">
                <form onSubmit={handleSignup}>
                    <h1>Create Account</h1>
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
                    <button type="submit">Sign Up</button>
                </form>
            </div>

            {/* Overlay Section */}
            <div className="overlay-container">
                <div className="overlay">
                    <div className="overlay-panel overlay-right">
                        <h1>Don't worry if you have schizo!</h1>
                        <p>Because you are not always alone.</p>
                        <button className="ghost" onClick={handleSignUp}>
                            Sign Up
                        </button>
                    </div>
                    <div className="overlay-panel overlay-left">
                        <h1>Welcome Back!</h1>
                        <p>Log in with your credentials</p>
                        <button className="ghost" onClick={handleSignIn}>
                            Log In
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PatientLoginSignup;


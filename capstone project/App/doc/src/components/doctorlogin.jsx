import React, { useState } from 'react';
import { supabase } from './supabaseClient';
import { useNavigate } from 'react-router-dom';

const DoctorLoginSignup = () => {
    const [isSignIn, setIsSignIn] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    // const role = 'doctor';
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
            const { data: doctorData, error: doctorError } = await supabase
                .from('doctors')
                .select('id')
                .eq('id', data.user.id)
                .single();
    
            if (doctorError || !doctorData) {
                // Show error if the user is not a doctor
                alert('No such user exists in the doctor records.');
                await supabase.auth.signOut();  // Log out user immediately
            } else {
                // Successful doctor login
                alert(`Welcome, Dr. ${data.user.email}`);
                navigate('/dashboard');
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
                data: { name },
            },
        });

        if (error) {
            alert(`Signup Error: ${error.message}`);
        } else {
            // Insert user role into the user_profiles table
            const { error: insertError } = await supabase
                .from('doctors')
                .insert([{ id: data.user.id, email, name }]);
            
            
            if (insertError) {
                alert(`Error saving role: ${insertError.message}`);
            } else {
                alert(`Account created for: ${data.user.email}`);
                navigate('/dashboard');
            }
        }
    };

    return (
        <>
            <style>
                {`
                @import url('https://fonts.googleapis.com/css?family=Montserrat:400,800');
                * {
                    box-sizing: border-box;
                    margin: 0;
                    padding: 0;
                }
                body {
                    background: #f6f5f7;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex-direction: column;
                    font-family: 'Montserrat', sans-serif;
                    height: 100vh;
                    margin: -20px 0 50px;
                }
                h1 {
                    font-weight: bold;
                    margin: 0;
                }
                h2 {
                    text-align: center;
                }
                p {
                    font-size: 14px;
                    font-weight: 100;
                    line-height: 20px;
                    letter-spacing: 0.5px;
                    margin: 20px 0 30px;
                }
                button {
                    border-radius: 20px;
                    border: 1px solid #FF4B2B;
                    background-color: #FF4B2B;
                    color: #FFFFFF;
                    font-size: 12px;
                    font-weight: bold;
                    padding: 12px 45px;
                    letter-spacing: 1px;
                    text-transform: uppercase;
                    transition: transform 80ms ease-in;
                    margin-top: 20px;
                }
                button:active {
                    transform: scale(0.95);
                }
                button:focus {
                    outline: none;
                }
                button.ghost {
                    background-color: transparent;
                    border-color: #FFFFFF;
                }
                form {
                    background-color: #FFFFFF;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-direction: column;
                    padding: 0 50px;
                    height: 100%;
                    text-align: center;
                }
                input {
                    background-color: #eee;
                    border: none;
                    padding: 12px 15px;
                    margin: 8px 0;
                    width: 100%;
                }
                .container {
                    background-color: #fff;
                    border-radius: 10px;
                    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 
                                0 10px 10px rgba(0,0,0,0.22);
                    position: relative;
                    overflow: hidden;
                    width: 768px;
                    max-width: 100%;
                    min-height: 480px;
                }
                .form-container {
                    position: absolute;
                    top: 0;
                    height: 100%;
                    transition: all 0.6s ease-in-out;
                }
                .sign-in-container {
                    left: 0;
                    width: 50%;
                    z-index: 2;
                }
                .container.right-panel-active .sign-in-container {
                    transform: translateX(100%);
                }
                .sign-up-container {
                    left: 0;
                    width: 50%;
                    opacity: 0;
                    z-index: 1;
                }
                .container.right-panel-active .sign-up-container {
                    transform: translateX(100%);
                    opacity: 1;
                    z-index: 5;
                    animation: show 0.6s;
                }
                @keyframes show {
                    0%, 49.99% {
                        opacity: 0;
                        z-index: 1;
                    }
                    
                    50%, 100% {
                        opacity: 1;
                        z-index: 5;
                    }
                }
                .overlay-container {
                    position: absolute;
                    top: 0;
                    left: 50%;
                    width: 50%;
                    height: 100%;
                    overflow: hidden;
                    transition: transform 0.6s ease-in-out;
                    z-index: 100;
                }
                .container.right-panel-active .overlay-container {
                    transform: translateX(-100%);
                }
                .overlay {
                    background: #FF416C;
                    background: -webkit-linear-gradient(to right, #FF4B2B, #FF416C);
                    background: linear-gradient(to right, #FF4B2B, #FF416C);
                    color: #FFFFFF;
                    position: relative;
                    left: -100%;
                    height: 100%;
                    width: 200%;
                    transform: translateX(0);
                    transition: transform 0.6s ease-in-out;
                }
                .container.right-panel-active .overlay {
                    transform: translateX(50%);
                }
                .overlay-panel {
                    position: absolute;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-direction: column;
                    padding: 0 40px;
                    text-align: center;
                    top: 0;
                    height: 100%;
                    width: 50%;
                    transform: translateX(0);
                    transition: transform 0.6s ease-in-out;
                }
                .overlay-left {
                    transform: translateX(-20%);
                }
                .container.right-panel-active .overlay-left {
                    transform: translateX(0);
                }
                .overlay-right {
                    right: 0;
                    transform: translateX(0);
                }
                .container.right-panel-active .overlay-right {
                    transform: translateX(20%);
                }
                `}
            </style>

            <div className={`container ${isSignIn ? '' : 'right-panel-active'}`}>
                <div className="form-container sign-in-container">
                    <form onSubmit={handleLogin}>
                        <h1>Doctor Login</h1>
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

                <div className="form-container sign-up-container">
                    <form onSubmit={handleSignup}>
                        <h1>Create Doctor Account</h1>
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
                        {/* <select value={role} onChange={(e) => setRole(e.target.value)} required>
                        <option value="patient">Patient</option>
                        <option value="doctor">Doctor</option>
                    </select> */}
                    <button type="submit">Sign Up</button>
                </form>
                       
                    
                </div>

                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>Welcome Back!</h1>
                            <p>Log in with your credentials</p>
                            <button className="ghost" onClick={handleSignIn}>
                                Log In
                            </button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1>Join as a Doctor</h1>
                            <p>Provide specialized care and support</p>
                            <button className="ghost" onClick={handleSignUp}>
                                Sign Up
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DoctorLoginSignup;

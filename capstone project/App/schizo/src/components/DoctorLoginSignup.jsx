// LoginSignup.jsx
import React, { useState } from 'react';
import styles from './plogin.css'; // Import the CSS module as an object

const LoginSignup = () => {
    const [isSignIn, setIsSignIn] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const handleSignIn = () => setIsSignIn(true);
    const handleSignUp = () => setIsSignIn(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/doctor-login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        if (response.ok) {
            alert(`Welcome Doctor: ${data.user.email}`);
        } else {
            alert(`Error: ${data.error}`);
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/patient-login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password }),
        });
        const data = await response.json();
        if (response.ok) {
            alert(`Account created for: ${data.user.email}`);
        } else {
            alert(`Error: ${data.error}`);
        }
    };

    return (
        <div className={`${styles.container} ${isSignIn ? '' : styles.rightPanelActive}`}>
            {/* Sign-In Form */}
            <div className={styles.formContainer + ' ' + styles.signInContainer}>
                <form onSubmit={handleLogin}>
                    <h1>Log in as Doctor</h1>
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
            <div className={styles.formContainer + ' ' + styles.signUpContainer}>
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
            <div className={styles.overlayContainer}>
                <div className={styles.overlay}>
                    <div className={`${styles.overlayPanel} ${styles.overlayRight}`}>
                        <h1>Hello, Doctor!</h1>
                        <p>Get ready with your work</p>
                        <button className={styles.ghost} onClick={handleSignUp}>
                            Sign Up
                        </button>
                    </div>
                    <div className={`${styles.overlayPanel} ${styles.overlayLeft}`}>
                        <h1>Welcome Back!</h1>
                        <p>Log in with your credentials</p>
                        <button className={styles.ghost} onClick={handleSignIn}>
                            Log In
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginSignup;

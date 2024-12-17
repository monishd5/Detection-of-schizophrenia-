// Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom'; // React Router hook
import Dashboard from './Dashboard'; // Import the Dashboard component

const Home = () => {
    const navigate = useNavigate(); // Initialize the navigate function

    const handleButtonClick = (path) => {
        navigate(path); // Navigate to the specified path
    };

    return (
        <div>
            {/* <h1>Welcome to the Home Page!</h1>
            <p>This is your home page after logging in.</p> */}

            {/* Dashboard Component */}
            <Dashboard onButtonClick={handleButtonClick} />
        </div>
    );
};

export default Home;

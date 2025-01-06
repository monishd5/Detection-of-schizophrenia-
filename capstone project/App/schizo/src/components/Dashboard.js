import React, { useEffect, useState } from 'react';
import './Dashboard.css'; // Import the CSS for styling
import apt from '../assets/appicon.png';
import rsc from '../assets/rsource.jpeg';
import games from '../assets/gameicon.png';
import med from  '../assets/medicon_1.png';
import mt from '../assets/moodtracker.jpeg';
import tasks from '../assets/tskicon.jpeg';

import { getPatientEmail } from './getpatient';  // Import the getPatientEmail function
import { supabase } from './supabaseClient';  // Make sure supabase is initialized
import { useNavigate } from 'react-router-dom';  // Import useNavigate from react-router-dom

const Dashboard = () => {
    const [avgTotalScore, setAvgTotalScore] = useState(0);  // Define the state for avgTotalScore
    const navigate = useNavigate(); // Initialize useNavigate hook

    useEffect(() => {
        const fetchAvgScore = async () => {
            try {
                // Get the patient's email
                const email = await getPatientEmail();
                console.log("Patient's email:", email);  // Add logging for email
    
                // Ensure email is valid before making the query
                if (!email) {
                    console.error('Email is not available');
                    return;
                }
    
                // Calculate the date range for the last 5 days
                const startDate = new Date(new Date().setDate(new Date().getDate() - 5)).toISOString().split('T')[0];
                console.log("Start Date:", startDate);  // Log the start date
    
                // Fetch the total_score for the last 5 days for this patient
                const { data, error } = await supabase
                    .from('mood_tracking')
                    .select('total_score, date')
                    .eq('patient_email', email)
                    .gte('date', startDate);
    
                if (error) {
                    console.error('Error fetching data from mood_tracking table:', error);
                    throw new Error('Failed to fetch scores from mood_tracking');
                }

                // Log the fetched data for debugging
                console.log('Fetched data:', data);
    
                // If no data found, handle gracefully
                if (!data || data.length === 0) {
                    console.log('No data found for the last 5 days');
                    setAvgTotalScore(0);  // Return 0 if no data found
                    return;
                }
    
                // Calculate the average total score
                const totalScoreSum = data.reduce((sum, row) => sum + row.total_score, 0);
                const avgTotalScore = totalScoreSum / data.length;
    
                console.log('Average Total Score for Last 5 Days:', avgTotalScore);
                setAvgTotalScore(avgTotalScore);
    
            } catch (error) {
                console.error('Error fetching average score:', error.message);
            }
        };
    
        fetchAvgScore();
    }, []);  // Empty dependency array ensures this effect runs only once on mount

    // Function to navigate to different pages when buttons are clicked
    const handleButtonClick = (route) => {
        navigate(route); // Navigate to the specified route
    };

    return (
        <div style={styles.container}>
            <h2>Average Mood Score: {avgTotalScore.toFixed(2)}</h2>  {/* Display the average score */}

            <div className="button-container" style={styles.buttonContainer}>
                <button className="image-button" style={styles.imageButton} onClick={() => handleButtonClick('/schizophrenia-qa')}>
                    <img src={rsc} alt="Schizophrenia Q&A" style={styles.image} />
                    <p style={styles.buttonText}>Schizophrenia Q&A</p>
                </button>
                <button className="image-button" style={styles.imageButton} onClick={() => handleButtonClick('/games')}>
                    <img src={games} alt="Games" style={styles.image} />
                    <p style={styles.buttonText}>Games</p>
                </button>
                <button className="image-button" style={styles.imageButton} onClick={() => handleButtonClick('/relaxation')}>
                    <img src={med} alt="Relaxation" style={styles.image} />
                    <p style={styles.buttonText}>Relaxation</p>
                </button>
                <button className="image-button" style={styles.imageButton} onClick={() => handleButtonClick('/appointmentshome')}>
                    <img src={apt} alt="Appointment" style={styles.image} />
                    <p style={styles.buttonText}>Appointment</p>
                </button>
                <button className="image-button" style={styles.imageButton} onClick={() => handleButtonClick('/mood-tracker')}>
                    <img src={mt} alt="Mood Tracker" style={styles.image} />
                    <p style={styles.buttonText}>Mood Tracker</p>
                </button>
                <button className="image-button" style={styles.imageButton} onClick={() => handleButtonClick('/tasks')}>
                    <img src={tasks} alt="Tasks" style={styles.image} />
                    <p style={styles.buttonText}>Tasks</p>
                </button>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        backgroundColor: '#d3d3d3',
        minHeight: '100vh',
    },
    buttonContainer: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)', // Three buttons per row
        gap: '20px',
        maxWidth: '600px', // Set max-width for alignment
        justifyContent: 'center',
    },
    imageButton: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '10px',
        backgroundColor: '#fff',
        borderRadius: '30px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        border: 'none',
        cursor: 'pointer',
        transition: 'transform 0.2s',
    },
    image: {
        width: '100px', // Control the image size
        height: '100px', // Keep the images square
        objectFit: 'cover',
        borderRadius: '4px',
        marginBottom: '10px',
    },
    buttonText: {
        fontSize: '1rem',
        color: '#333',
        textAlign: 'center',
    },
};

export default Dashboard;

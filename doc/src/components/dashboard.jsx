import React from 'react';
import { useNavigate } from 'react-router-dom';
import apt from './apmt.jpeg'; // Replace with the correct image path
import tsk from './tskicon.jpeg';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleButtonClick = (path) => {
    console.log(`Navigating to ${path}`);
    navigate(path);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.welcomeText}>Welcome, Doctor!</h1>
      <div style={styles.buttonContainer}>
        <button
          style={styles.imageButton}
          onClick={() => handleButtonClick('/appointments')}
        >
          <img
            src={apt} // use the imported image here
            alt="Appointments"
            style={styles.image}
          />
          <p style={styles.buttonText}>Appointments</p>
        </button>

        <button
          style={styles.imageButton}
          onClick={() => handleButtonClick('/tasks')}
        >
          <img
            src={tsk} // Replace with the actual image path
            alt="Tasks"
            style={styles.image}
          />
          <p style={styles.buttonText}>Tasks</p>
        </button>

        {/* <button
          style={styles.imageButton}
          onClick={() => handleButtonClick('/path3')}
        >
          <img
            src="/path/to/your/image3.jpg" // Replace with the actual image path
            alt="Button 3"
            style={styles.image}
          />
          <p style={styles.buttonText}>Button 3</p>
        </button> */}
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
    backgroundColor: '#e9f7f5',
    minHeight: '100vh',
  },
  welcomeText: {
    fontSize: '2rem',
    marginBottom: '20px',
    color: '#333',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
  },
  imageButton: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '10px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    border: 'none',
    cursor: 'pointer',
    transition: 'transform 0.2s',
  },
  image: {
    width: '100px',
    height: '100px',
    objectFit: 'cover',
    borderRadius: '4px',
    marginBottom: '10px',
  },
  buttonText: {
    fontSize: '1rem',
    color: '#333',
  },
};

export default Dashboard;

import React from "react";
import apt from './appresp.jpeg';
import req from './sendreq.jpg';

const Disappointment = () => {
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px',
      backgroundColor: '#e9f7f5',
      minHeight: '100vh',
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
      width: '100px',  // Ensuring both images have the same width
      height: '100px',  // Ensuring both images have the same height
      objectFit: 'cover',
      borderRadius: '4px',
      marginBottom: '10px',
    },
    buttonText: {
      fontSize: '1rem',
      color: '#333',
    },
  };

  const onButtonClick = (path) => {
    window.location.href = `${process.env.PUBLIC_URL}${path}`;
  };

  return (
    <div style={styles.container}>
      <div style={styles.buttonContainer}>
        <button
          style={styles.imageButton}
          onClick={() => onButtonClick('/appointment-request')}
        >
          <img
            src={req}
            alt="Request an appointment"
            style={styles.image}
          />
          <p style={styles.buttonText}>Request for <br></br>Appointment</p>
        </button>
        <button
          style={styles.imageButton}
          onClick={() => onButtonClick('/appointments')}
        >
          <img
            src={apt}
            alt="View appointments"
            style={styles.image}
          />
          <p style={styles.buttonText}>View <br></br> Appointment</p>
        </button>
      </div>
    </div>
  );
};

export default Disappointment;

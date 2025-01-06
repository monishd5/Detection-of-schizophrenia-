import React from 'react';

const Car = () => {
    const styles = {
        body: {
            fontFamily: 'Arial, sans-serif',
            backgroundColor: '#5A5A5A',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            margin: 0,
            flexDirection: 'row',  // Horizontal layout (landscape)
        },
        gameContainer: {
            textAlign: 'center',
            padding: '20px',
            backgroundColor: '#ffffff',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            borderRadius: '8px',
            width: '80%',  // Adjust width as needed
            height: '80%', // Adjust height for landscape
            display: 'flex', // Use flexbox to center the iframe inside
            flexDirection: 'column',  // Stack content vertically inside the container
            justifyContent: 'center', // Center content vertically
            alignItems: 'center', // Center content horizontally
        },
        heading: {
            color: '#333',
            marginBottom: '20px',  // Add margin to space out from iframe
        },
        iframe: {
            width: '100%', // Make the iframe take up the full width of its container
            height: '80%', // Adjust height to fill most of the container
            border: 'none', // Remove the iframe border
        },
    };

    return (
        <div style={styles.body}>
            <div style={styles.gameContainer}>
                <h1 style={styles.heading}>Relaxing Slow Roads</h1>
                <iframe
                    title="Relaxing Slow Roads"
                    src="https://slowroads.io/"
                    style={styles.iframe}
                ></iframe>
            </div>
        </div>
    );
};

export default Car;

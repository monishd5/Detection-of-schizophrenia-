
import React from 'react';

const Diff = () => {
    const styles = {
        body: {
            fontFamily: 'Arial, sans-serif',
            backgroundColor: '#f0f8ff',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            margin: 0,
        },
        gameContainer: {
            textAlign: 'center',
            padding: '20px',
            backgroundColor: '#ffffff',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            borderRadius: '8px',
        },
        heading: {
            color: '#333',
        },
        iframe: {
            width: '100%',
            height: '500px',
            border: 'none',
        },
    };

    return (
        <div style={styles.body}>
            <div style={styles.gameContainer}>
                <h1 style={styles.heading}>Relax and Play Find The Difference</h1>
                <iframe
                    title="Find The Difference !"
                    src="https://www.spotthedifference.com/"
                    style={styles.iframe}
                ></iframe>
            </div>
        </div>
    );
};

export default Diff;

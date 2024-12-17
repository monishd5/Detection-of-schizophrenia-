// RelaxAndPlay2048.js
import React from 'react';

const RelaxAndPlay2048 = () => {
    const styles = {
        body: {
            fontFamily: 'Arial, sans-serif',
            backgroundColor: '#5A5A5A',
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
                <h1 style={styles.heading}>Relax and Play 2048</h1>
                <iframe
                    title="2048 Game"
                    src="https://2048.app/"
                    style={styles.iframe}
                ></iframe>
            </div>
        </div>
    );
};

export default RelaxAndPlay2048;

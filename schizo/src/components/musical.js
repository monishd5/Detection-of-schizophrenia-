import React from 'react';

const Music = () => {
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
                <h1 style={styles.heading}>Relax and listen to the song</h1>
                <iframe
                    title="Relaxing Music Game"
                    src="https://www.patatap.com/"
                    style={styles.iframe}
                ></iframe>
            </div>
        </div>
    );
};

export default Music;

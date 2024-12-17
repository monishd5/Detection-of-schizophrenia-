import React from 'react';

const Balance = () => {
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
                <h1 style={styles.heading}>Sea Lion Balance</h1>
                <iframe
                    title="sea lion"
                    src="https://www.gamezop.com/en/game/SyQZs6nzueW/The-Sea-Lion-Act?int-nav=1&sessionStartPage=home-page&src=comet"
                    style={styles.iframe}
                ></iframe>
            </div>
        </div>
    );
};

export default Balance;

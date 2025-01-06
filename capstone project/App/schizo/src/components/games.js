import React from 'react';
import rcar1 from './rcar1.jpeg';
// import rmusic2 from './rmusic2.jpeg';
import g2048 from './2048_img.jpg';
import diff from './difference.jpg'
import music from './music_img.jpg';
import wiz from '../assets/wizard.jpg';
import viking from '../assets/viking.jpeg';
import illumin from '../assets/illumin.jpg';
import sealion from '../assets/sealion.jpeg';
// const g2048 = `${process.env.PUBLIC_URL}/2048_img.jpeg`;

const RelaxAndPlay = () => {
    const styles = {
        pageContainer: {
            fontFamily: 'Arial, sans-serif',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '20px',
            background: 'linear-gradient(135deg, #5A5A5A, #3e3e3e)', // Dark gray gradient
            minHeight: '100vh',
            
        },
        headline: {
            fontSize: '2.5rem',
            color: '#FFFFFF',
            marginBottom: '20px',
            fontWeight: 'bold',
            textAlign: 'center',
        },
        section: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            margin: '20px 0',
            width: '100%',
            maxWidth: '800px',
            backgroundColor: '#fdfdfd',
            borderRadius: '12px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            padding: '20px',
        },
        sectionTitle: {
            fontSize: '1.8rem',
            color: '#555',
            marginBottom: '15px',
        },
        buttonContainer: {
            display: 'flex',
            justifyContent: 'center',
            gap: '15px',
        },
        gameButton: {
            width: '100px',
            height: '100px',
            borderRadius: '15px',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            margin: '10px',
            cursor: 'pointer',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        },

    };

    const onButtonClick = (path) => {
        window.location.href = `${process.env.PUBLIC_URL}${path}`;
    };

    return (
        <div style={styles.pageContainer}>
            <h1 style={styles.headline}>Relax and Play</h1>

            <div style={styles.section}>
                <h2 style={styles.sectionTitle}>Focus-Based Games</h2>
                <div style={styles.buttonContainer}>
                    <button
                        style={{ ...styles.gameButton, backgroundImage: `url(${illumin})` }}
                        onClick={() => onButtonClick('/games/illuminate')}
                    />
                    <button
                        style={{ ...styles.gameButton, backgroundImage: `url(${g2048})` }}
                        onClick={() => onButtonClick('/games/2048')}
                    />
                    <button
                        style={{ ...styles.gameButton, backgroundImage: `url(${viking})` }}
                        onClick={() => onButtonClick('/games/viking')}
                    />
                </div>
            </div>

            <div style={styles.section}>
                <h2 style={styles.sectionTitle}>Relaxing Games</h2>
                <div style={styles.buttonContainer}>
                    <button
                        style={{ ...styles.gameButton, backgroundImage: `url(${wiz})` }}
                        onClick={() => onButtonClick('/games/wizard')}
                    />
                    <button
                        style={{ ...styles.gameButton, backgroundImage: `url(${music})` }}
                        onClick= {() => onButtonClick('/games/music')}
                    />
                    <button
                        style={{ ...styles.gameButton, backgroundImage: `url(${sealion})` }}
                        onClick= {() => onButtonClick('/games/balanceit')}
                    />
                </div>
            </div>
        </div>
    );
};

export default RelaxAndPlay;

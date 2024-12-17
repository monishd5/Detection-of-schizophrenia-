import React, { useState, useRef } from 'react';

const MeditationPage = () => {
    const [isBreathing, setIsBreathing] = useState(false);
    const [duration, setDuration] = useState(1);
    const [exerciseType, setExerciseType] = useState('3s');
    const breathingCircleRef = useRef(null);
    const breathingIntervalRef = useRef(null);

    const startBreathingExercise = () => {
        if (!isBreathing) {
            // Start the breathing animation
            if (breathingCircleRef.current) {
                breathingCircleRef.current.style.animationPlayState = 'running';
            }
            setIsBreathing(true);

            // Stop animation after specified duration
            breathingIntervalRef.current = setTimeout(() => {
                stopBreathingExercise();
            }, duration * 60 * 1000); // Convert minutes to milliseconds
        } else {
            // Manually stop the exercise
            stopBreathingExercise();
        }
    };

    const stopBreathingExercise = () => {
        // Check if breathingCircleRef.current exists
        if (breathingCircleRef.current) {
            // Pause the animation and clear the interval
            breathingCircleRef.current.style.animationPlayState = 'paused';
        }
        clearTimeout(breathingIntervalRef.current);
        setIsBreathing(false);
    };

    return (
        <div>
            <header>
                <h1>Interactive Meditation Experience</h1>
                <p>Find calmness and mindfulness through dynamic breathing exercises.</p>
            </header>

            <section className="section breathing-exercise">
                <h2>Breathing Exercises</h2>
                <p>Select a breathing cycle and set the duration, then press "Start" to begin.</p>

                <div className="control-panel">
                    <select className="dropdown" value={exerciseType} onChange={(e) => setExerciseType(e.target.value)}>
                        <option value="4s">Energy Breathing 4c</option>
                        <option value="3s">Focus Breathing 3c</option>
                        <option value="7s">Relaxation Breathing 7c</option>
                    </select>

                    <input
                        type="number"
                        className="duration-input"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        placeholder="Duration (minutes)"
                        min="1"
                        max="30"
                    />

                    <button className="start-button" onClick={startBreathingExercise}>
                        {isBreathing ? 'Stop' : 'Start'}
                    </button>
                </div>

                <div
                    className="breathing-animation"
                    ref={breathingCircleRef}
                    style={{
                        width: '200px',
                        height: '200px',
                        backgroundColor: '#4a628a',
                        borderRadius: '50%',
                        margin: '50px auto',
                        animation: `breathe 5s ease-in infinite paused`,
                        animationDuration: exerciseType,
                    }}
                ></div>
            </section>

            <div className="video-section">
                <div className="video-container">
                    <h3 className="video-title">10min Meditation</h3>
                    <iframe
                        width="560"
                        height="315"
                        src="https://www.youtube.com/embed/ez3GgRqhNvA?si=FwDos_CB8T-wUf3J"
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                    ></iframe>
                </div>
                <div className="video-container">
                    <h3 className="video-title">5min Meditation</h3>
                    <iframe
                        width="560"
                        height="315"
                        src="https://www.youtube.com/embed/inpok4MKVLM?si=n3vi9bHtuZBT-Qle"
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                    ></iframe>
                </div>
            </div>

            <div className="benefits-section">
                <h2>Benefits of Meditation</h2>
                <p>Meditation has been practiced for thousands of years and offers numerous benefits for the mind and body. Here are some of the key advantages:</p>
                <ul>
                    <li><strong>Reduces Stress:</strong> Meditation helps lower levels of the stress hormone cortisol, leading to decreased anxiety and improved emotional health.</li>
                    <li><strong>Enhances Concentration:</strong> Regular meditation practice can improve attention span and concentration, making it easier to focus on tasks.</li>
                    <li><strong>Promotes Emotional Health:</strong> Meditation can lead to improved self-awareness and emotional regulation, fostering a more positive outlook on life.</li>
                    <li><strong>Improves Sleep:</strong> By calming the mind, meditation can help alleviate insomnia and promote better sleep quality.</li>
                    <li><strong>Encourages Mindfulness:</strong> Meditation enhances mindfulness, allowing individuals to stay present and fully engage in their lives.</li>
                    <li><strong>Boosts Overall Well-Being:</strong> Regular practice can lead to improved mental clarity, increased creativity, and a greater sense of purpose.</li>
                </ul>
            </div>

            <style jsx>{`
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                    background-color: #f0f9f8;
                    color: #333;
                }
                header {
                    background-color: #7ab2d3;
                    color: #fff;
                    padding: 40px;
                    text-align: center;
                }
                .section {
                    margin: 40px;
                    padding: 20px;
                    background-color: white;
                    border-radius: 8px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                }
                .section h2 {
                    color: #7ab2d3;
                    text-align: center;
                }
                .control-panel {
                    margin-top: 15px;
                }
                .start-button {
                    padding: 10px 20px;
                    font-size: 1.2em;
                    color: white;
                    background-color: #7ab2d3;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    margin-top: 10px;
                }
                .start-button:hover {
                    background-color: #000000;
                }
                .dropdown,
                .duration-input {
                    padding: 10px;
                    font-size: 1em;
                    margin-top: 10px;
                    border-radius: 5px;
                    border: 1px solid #ddd;
                }
                @keyframes breathe {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.2); }
                }
                .video-section {
                    margin: 40px;
                    padding: 20px;
                    background-color: #f7f7f7;
                    border-radius: 8px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                }
                .video-title {
                    font-size: 1em;
                    color: #555;
                    margin-top: 8px;
                }
                .benefits-section {
                    margin: 40px;
                    padding: 20px;
                    background-color: #e9f7f5;
                    border-radius: 8px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                }
                .benefits-section h2 {
                    color: #88d8b0;
                    text-align: center;
                }
                .benefits-section p {
                    text-align: center;
                    font-size: 1.1em;
                    margin-bottom: 20px;
                }
                .benefits-section ul {
                    list-style-type: none;
                    padding: 0;
                }
                .benefits-section li {
                    margin: 10px 0;
                    font-size: 1em;
                }
            `}</style>
        </div>
    );
};

export default MeditationPage;

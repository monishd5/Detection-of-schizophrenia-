import React, { useState } from 'react';

const SchizophreniaKnowledgeQA = () => {
    const [activeQuestion, setActiveQuestion] = useState(null);

    const toggleAnswer = (index) => {
        setActiveQuestion(activeQuestion === index ? null : index);
    };

    return (
        <div>
            <header style={styles.header}>
                <h1>Schizophrenia Knowledge Q&A</h1>
            </header>

            <div style={styles.container}>
                <h2>Questions & Answers</h2>

                <button style={styles.question} onClick={() => toggleAnswer(0)}>
                    What is schizophrenia?
                </button>
                {activeQuestion === 0 && (
                    <div style={styles.answer}>
                        <p>Schizophrenia is a serious mental disorder in which people interpret reality abnormally...</p>
                    </div>
                )}

                <button style={styles.questionB} onClick={() => toggleAnswer(1)}>
                    What are the common symptoms?
                </button>
                {activeQuestion === 1 && (
                    <div style={styles.answer}>
                        <p>Common symptoms of schizophrenia include hallucinations, delusions, disorganized thinking...</p>
                    </div>
                )}

                {/* Add other Q&A buttons here in a similar pattern */}
                <button style={styles.questionC} onClick={() => toggleAnswer(2)}>
    How is schizophrenia treated?
</button>
{activeQuestion === 2 && (
    <div style={styles.answer}>
        <p>Treatment typically involves a combination of medication and therapy...</p>
    </div>
)}

<button style={styles.questionB} onClick={() => toggleAnswer(3)}>
    What resources are available for caregivers?
</button>
{activeQuestion === 3 && (
    <div style={styles.answer}>
        <p>Caregivers can access various resources like support groups, mental health hotlines...</p>
    </div>
)}

<button style={styles.question} onClick={() => toggleAnswer(4)}>
    What causes schizophrenia?
</button>
{activeQuestion === 4 && (
    <div style={styles.answer}>
        <p>The exact cause is unknown, but it is believed to be a combination of genetic and environmental factors...</p>
    </div>
)}

<button style={styles.questionB} onClick={() => toggleAnswer(5)}>
    Can schizophrenia be cured?
</button>
{activeQuestion === 5 && (
    <div style={styles.answer}>
        <p>While there is currently no cure, many people can manage their symptoms effectively...</p>
    </div>
)}

<button style={styles.questionC} onClick={() => toggleAnswer(6)}>
    How can I cope with schizophrenia?
</button>
{activeQuestion === 6 && (
    <div style={styles.answer}>
        <p>Coping strategies include sticking to a treatment plan, establishing a routine...</p>
    </div>
)}

<button style={styles.question} onClick={() => toggleAnswer(7)}>
    How does it impact my daily life?
</button>
{activeQuestion === 7 && (
    <div style={styles.answer}>
        <p>Schizophrenia can make it challenging to work, study, or maintain relationships...</p>
    </div>
)}

<button style={styles.questionB} onClick={() => toggleAnswer(8)}>
    How can family and friends support someone with schizophrenia?
</button>
{activeQuestion === 8 && (
    <div style={styles.answer}>
        <p>Family and friends can provide support by being understanding, patient, and encouraging...</p>
    </div>
)}

<button style={styles.questionC} onClick={() => toggleAnswer(9)}>
    What should I do during a crisis?
</button>
{activeQuestion === 9 && (
    <div style={styles.answer}>
        <p>If you feel overwhelmed or in crisis, reach out to a trusted friend, family member...</p>
    </div>
)}

            </div>

            <div style={styles.videoSection}>
                <h2>Video Resources</h2>
                <div style={styles.videoGrid}>
                    <div style={styles.videoItem}>
                        <iframe
                            width="100%"
                            height="315"
                            src="https://www.youtube.com/embed/pjTmZqBNB78?si=d7QzxMkidaHb7Qb1"
                            title="Schizophrenia Overview in 2min"
                            allowFullScreen
                        />
                        <p style={styles.videoTitle}>Schizophrenia Overview</p>
                    </div>

                    {/* Add other video items here in a similar pattern */}
                    <div style={styles.videoItem}>
    <iframe
        width="100%"
        height="315"
        src="https://www.youtube.com/embed/u3FES9W8P04?si=1Fajjg9z-1yg81HG"
        title="Understanding Symptoms"
        allowFullScreen
    />
    <p style={styles.videoTitle}>Understanding Symptoms</p>
</div>

<div style={styles.videoItem}>
    <iframe
        width="100%"
        height="315"
        src="https://www.youtube.com/embed/VBPnugPxofU?si=98Aj5Bxe7NOZH7fX"
        title="Caregiving Tips"
        allowFullScreen
    />
    <p style={styles.videoTitle}>Caregiving Tips</p>
</div>

<div style={styles.videoItem}>
    <iframe
        width="100%"
        height="315"
        src="https://www.youtube.com/embed/TFVu6ICa8pQ?si=09OnTzLAe6wshXd2"
        title="Medication and Treatment"
        allowFullScreen
    />
    <p style={styles.videoTitle}>Medication and Treatment</p>
</div>

                </div>
            </div>

            <div style={styles.podcastSection}>
                <h2>Podcast Videos</h2>
                <div style={styles.podcastGrid}>
                    <div style={styles.podcastItem}>
                        <iframe
                            width="100%"
                            height="315"
                            src="https://www.youtube.com/embed/lMqEMKJ0vWk?si=ZC6Krudmv62JEO9k"
                            title="Podcast Episode 1: Schizophrenia Overview"
                            allowFullScreen
                        />
                        <p style={styles.podcastTitle}>Podcast Episode 1: Schizophrenia Overview</p>
                    </div>

                    {/* Add other podcast items here in a similar pattern */}
                    <div style={styles.podcastItem}>
    <iframe
        width="100%"
        height="315"
        src="https://www.youtube.com/embed/GS5cdPGjE2U?si=x12iC6Bcv1WfqMBQ"
        title="Podcast Episode 2: Symptoms and Diagnosis"
        allowFullScreen
    />
    <p style={styles.podcastTitle}>Podcast Episode 2: Symptoms and Diagnosis</p>
</div>

<div style={styles.podcastItem}>
    <iframe
        width="100%"
        height="315"
        src="https://www.youtube.com/embed/w9MXqXBZy9U?si=cJUzYlIkdqBv82z6"
        title="Podcast Episode 3: Living with Schizophrenia"
        allowFullScreen
    />
    <p style={styles.podcastTitle}>Podcast Episode 3: Living with Schizophrenia</p>
</div>

<div style={styles.podcastItem}>
    <iframe
        width="100%"
        height="315"
        src="https://www.youtube.com/embed/UCbqfBAhmPY?si=7RdzAKgFEmQR6VAo"
        title="Podcast Episode 4: Treatment Options"
        allowFullScreen
    />
    <p style={styles.podcastTitle}>Podcast Episode 4: Treatment Options</p>
</div>

                </div>
            </div>

            <div style={styles.buttonsSection}>
                <h2>Join the Community</h2>
                <div style={styles.buttonContainer}>
                    <a href="https://www.reddit.com/r/schizophrenia/" target="_blank" rel="noopener noreferrer" style={styles.button}>
                        Visit Reddit Community
                    </a>
                    <a href="https://www.nature.com/subjects/schizophrenia" target="_blank" rel="noopener noreferrer" style={styles.button}>
                        View Recent Updates
                    </a>
                    <a href="https://scholar.google.com/scholar?hl=en&as_sdt=0%2C5&q=recent+research+in+schizophrenia&btnG=" target="_blank" rel="noopener noreferrer" style={styles.button}>
                        View Research papers
                    </a>
                </div>
            </div>
        </div>
    );
};

const styles = {
    header: {
        backgroundColor: '#4a628a',
        color: 'white',
        padding: '15px',
        textAlign: 'center'
    },
    container: {
        maxWidth: '800px',
        margin: '20px auto',
        padding: '20px',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
    },
    question: {
        backgroundColor: '#B9E5E8',
        color: 'white',
        cursor: 'pointer',
        padding: '15px',
        margin: '5px 0',
        fontSize: '1.1em',
        border: 'none',
        textAlign: 'left',
        outline: 'none',
        transition: 'background-color 0.3s',
        borderRadius: '5px'
    },
    questionB: {
        backgroundColor: '#7AB2D3',
        color: 'white',
        cursor: 'pointer',
        padding: '15px',
        margin: '5px 0',
        fontSize: '1.1em',
        border: 'none',
        textAlign: 'left',
        outline: 'none',
        transition: 'background-color 0.3s',
        borderRadius: '5px'
    },
    questionC: {
        backgroundColor: "#4a628a",
        color: "white",
        cursor: "pointer",
        padding: "15px",
        margin: "5px 0",
        fontSize: "1.1em",
        border: "none",
        textAlign: "left",
        outline: "none",
        transition: "background-color 0.3s",
        borderRadius: "5px",
    },
    questionCHover: {
        backgroundColor: "#000000",
    },
    
    
    answer: {
        padding: '15px',
        display: 'block',
        backgroundColor: '#f9f9f9',
        color: '#555',
        borderLeft: '4px solid #4CAF50',
        marginBottom: '5px',
        borderRadius: '5px'
    },
    videoSection: {
        marginTop: '20px',
        padding: '20px',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
    },
    videoGrid: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '20px'
    },
    videoItem: {
        textAlign: 'center'
    },
    videoTitle: {
        fontSize: '1em',
        color: '#555',
        marginTop: '8px'
    },
    podcastSection: {
        marginTop: '20px',
        padding: '20px',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
    },
    podcastGrid: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '20px'
    },
    podcastItem: {
        textAlign: 'center'
    },
    podcastTitle: {
        fontSize: '1em',
        color: '#555',
        marginTop: '8px'
    },
    buttonsSection: {
        marginTop: '20px',
        padding: '20px',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        textAlign: 'center'
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',
        marginTop: '10px'
    },
    button: {
        padding: '15px 30px',
        fontSize: '1em',
        color: 'white',
        backgroundColor: '#ff8223',
        textDecoration: 'none',
        borderRadius: '5px',
        transition: 'background-color 0.3s'
    }
};

export default SchizophreniaKnowledgeQA;

import { supabase } from './supabaseClient';
import React, { useState } from 'react';
import './mood.module.css'; // Make sure this path is correct
import { getPatientEmail } from './getpatient'; // Import getPatientEmail function

const questions = [
  "How energetic do you feel today?",
  "How well did you sleep last night?",
  "How positive do you feel right now?",
  "How stressed are you feeling currently?",
  "How focused are you feeling today?",
  "How satisfied are you with your relationships?",
  "How motivated do you feel to achieve your goals?",
  "How anxious do you feel at the moment?",
  "How relaxed do you feel right now?",
  "How much physical pain are you in, if any?",
  "How satisfied are you with your work or studies?",
  "How supported do you feel by those around you?",
  "How grateful do you feel today?",
  "How optimistic are you about the future?",
  "How present are you feeling in this moment?"
];

const MoodTracker = () => {
  const [sliderValues, setSliderValues] = useState(Array(questions.length).fill(10));
  const [totalScore, setTotalScore] = useState(0);

  const updateValue = (index, value) => {
    const updatedValues = [...sliderValues];
    updatedValues[index] = Number(value);
    setSliderValues(updatedValues);
  };

  const calculateScore = async () => {
    const score = sliderValues.reduce((acc, curr) => acc + curr, 0);
    setTotalScore(score);
    await sendToBackend(score); // Pass the score to the backend after calculation
  };

  const sendToBackend = async (score) => {
    try {
      const email = await getPatientEmail(); // Fetch the patient's email
      const today = new Date().toISOString().split('T')[0]; // Today's date in YYYY-MM-DD format
      const moodScores = sliderValues; // Keep the array as is
      const totalScore = sliderValues.reduce((acc, curr) => acc + curr, 0); // Calculate total score for backend
      
      // Format the array as a PostgreSQL array string
      const formattedMoodScores = `{${moodScores.join(',')}}`; 

      // Debugging: Check the data being sent
      console.log('Sending data to Supabase:', {
        patient_email: email,
        mood_scores: formattedMoodScores,
        total_score: totalScore,
        date: today,
      });

      // Use upsert to insert or update the mood data for the patient on the given date
      const { data, error } = await supabase
        .from('mood_tracking')
        .upsert(
          [
            {
              patient_email: email,
              mood_scores: formattedMoodScores, // Insert the properly formatted array string
              total_score: totalScore, // Insert the total score as well
              date: today,
            },
          ],
          { onConflict: ['patient_email', 'date'] } // Ensure upsert happens if patient and date match
        );

      if (error) {
        console.error('Error inserting/updating mood tracking data:', error);
      } else {
        console.log('Mood data successfully inserted/updated:', data);
      }
    } catch (error) {
      console.error('Error in Supabase operation:', error);
    }
  };

  return (
    <div className="mood-tracker-container">
      <h1 className="mood-tracker-title">Mood Tracker</h1>
      <p className="mood-tracker-description">
        Please answer the following questions on a scale from 1 to 10, where 1 means "not at all" and 10 means "very much."
      </p>
      <form className="mood-tracker-form">
        <div className="questionsContainer">
          {questions.map((question, index) => (
            <div className="question" key={index}>
              <label htmlFor={`question${index + 1}`} className="question-label">{question}</label>
              <input
                type="range"
                id={`question${index + 1}`}
                min="1"
                max="10"
                value={sliderValues[index]}
                onChange={(e) => updateValue(index, e.target.value)}
                className="slider"
              />
              <span className="slider-value">{sliderValues[index]}</span>
            </div>
          ))}
        </div>
        <button type="button" className="calculate-button" onClick={calculateScore}>
          Calculate Total Score
        </button>
      </form>
      <div className="total-score">Total Score: {totalScore}</div>
    </div>
  );
};

export default MoodTracker;

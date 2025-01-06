// src/RequestAppointment.js
import { supabase } from './supabaseClient';
import { useState, useEffect } from 'react';
import { getPatientEmail } from './getpatient'; // Import the function

function RequestAppointment() {
  const [patientEmail, setPatientEmail] = useState('');
  const [doctorEmail, setDoctorEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPatientEmailAndDoctorEmail = async () => {
      try {
        // Fetch patient email
        const email = await getPatientEmail();
        setPatientEmail(email);

        // Fetch connected doctor email based on patient email
        const { data, error } = await supabase
          .from('connections')
          .select('doctor_email')
          .eq('patient_email', email)
          .eq('status', 'connected')
          .single();

        if (error) {
          console.error('Failed to fetch doctor email:', error.message);
        } else if (data) {
          setDoctorEmail(data.doctor_email); // Set the doctor email
        }
      } catch (error) {
        console.error('Error fetching emails:', error.message);
      }
    };

    fetchPatientEmailAndDoctorEmail();
  }, []);

  const requestAppointment = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('appointments')
      .insert([
        {
          patient_email: patientEmail,
          doctor_email: doctorEmail,
          status: 'requested',
          notes: notes
        }
      ]);

    if (error) {
      console.error('Error requesting appointment:', error.message);
    } else {
      alert('Appointment request sent!');
      setNotes('');
    }
    setLoading(false);
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f7f7f7',
      padding: '20px',
      borderRadius: '10px',
      width: '80%',
      maxWidth: '500px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      margin: 'auto'
    }}>
      <h2 style={{
        color: '#333',
        marginBottom: '20px',
        fontFamily: 'Arial, sans-serif'
      }}>
        Request an Appointment
      </h2>
      
      <input
        type="email"
        placeholder="Doctor email"
        value={doctorEmail}
        disabled // Disable the input so user can't edit
        style={{
          width: '100%',
          padding: '10px',
          marginBottom: '10px',
          borderRadius: '5px',
          border: '1px solid #ddd',
          fontSize: '16px',
          boxSizing: 'border-box',
          backgroundColor: '#f0f0f0' // Slightly gray out the input for clarity
        }}
      />
      
      <textarea
        placeholder="Enter notes for the appointment"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        style={{
          width: '100%',
          padding: '10px',
          marginBottom: '20px',
          borderRadius: '5px',
          border: '1px solid #ddd',
          fontSize: '16px',
          minHeight: '100px',
          boxSizing: 'border-box'
        }}
      ></textarea>
      
      <button
        onClick={requestAppointment}
        disabled={loading || !doctorEmail}
        style={{
          backgroundColor: '#007bff',
          color: 'white',
          padding: '10px 20px',
          fontSize: '16px',
          border: 'none',
          borderRadius: '5px',
          cursor: loading || !doctorEmail ? 'not-allowed' : 'pointer',
          width: '100%',
          transition: 'background-color 0.3s',
        }}
      >
        {loading ? 'Requesting...' : 'Request Appointment'}
      </button>
    </div>
  );
}

export default RequestAppointment;

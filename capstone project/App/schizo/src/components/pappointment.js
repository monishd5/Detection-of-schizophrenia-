// src/PatientAppointments.js
import { supabase } from './supabaseClient';
import { useState, useEffect } from 'react';
import { getPatientEmail } from './getpatient';

function PatientAppointments() {
  const [patientEmail, setPatientEmail] = useState('');
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPatientEmailAndAppointments = async () => {
      try {
        const email = await getPatientEmail();
        setPatientEmail(email);
        fetchAppointments(email);
      } catch (error) {
        console.error('Failed to fetch patient email:', error.message);
      }
    };

    fetchPatientEmailAndAppointments();
  }, []);

  const fetchAppointments = async (email) => {
    setLoading(true);
    const { data, error } = await supabase
      .from('appointments')
      .select(`
        id,
        doctor_email,
        status,
        confirmed_date,
        confirmed_time,
        notes,
        doctors (name)
      `)
      .eq('patient_email', email)
      .eq('status', 'confirmed');

    if (error) {
      console.error('Error fetching appointments:', error.message);
    } else {
      console.log('Fetched appointments:', data);
      setAppointments(data);
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#f0f8ff', borderRadius: '10px' }}>
      <h2 style={{ textAlign: 'center', color: '#1e3a8a' }}>Your Confirmed Appointments</h2>
      {loading ? (
        <p style={{ textAlign: 'center', color: '#1e3a8a' }}>Loading appointments...</p>
      ) : appointments.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#1e3a8a' }}>No confirmed appointments</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {appointments.map((appointment) => (
            <li key={appointment.id} style={{
              border: '1px solid #1e3a8a',
              borderRadius: '8px',
              padding: '16px',
              marginBottom: '12px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              backgroundColor: '#e0f7fa',
              fontFamily: 'Arial, sans-serif', // Use system default sans-serif font

            }}>
              <h3 style={{ margin: '0 0 8px', color: '#1e3a8a' }}>
                Appointment with: Dr. {appointment.doctors?.name || 'Unknown Doctor'} ({appointment.doctor_email})
              </h3>
              <p style={{ margin: '0 0 8px', color: '#1e3a8a' }}>
                Date: {appointment.confirmed_date || 'Pending'} 
              </p>
              <p style={{ margin: '0 0 8px', color: '#1e3a8a' }}>
                Time: {appointment.confirmed_time || 'Pending'}
              </p>
              <p style={{
                fontSize: '12px',
                color: '#888',
                marginTop: '16px',
                textAlign: 'right'
              }}>
                {/* Scheduled on: {new Date(appointment.created_at).toLocaleString()} */}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PatientAppointments;

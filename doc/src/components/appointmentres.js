// src/AppointmentRequests.js
import { supabase } from './supabaseClient';
import { useState, useEffect } from 'react';
import { getDoctorEmail } from './getdoctorid';

function AppointmentRequests() {
  const [doctorEmail, setDoctorEmail] = useState('');
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [confirmationDetails, setConfirmationDetails] = useState({}); // Holds date and time for each appointment

  useEffect(() => {
    const fetchDoctorEmailAndAppointments = async () => {
      try {
        const email = await getDoctorEmail();
        setDoctorEmail(email);
        fetchAppointments(email);
      } catch (error) {
        console.error('Failed to fetch doctor email:', error.message);
      }
    };

    fetchDoctorEmailAndAppointments();
  }, []);

  const fetchAppointments = async (email) => {
    setLoading(true);
    const { data, error } = await supabase
      .from('appointments')
      .select(`
        id,
        patient_email,
        status,
        notes,
        created_at,
        patients (name)
      `)
      .eq('doctor_email', email)
      .eq('status', 'requested');

    if (error) {
      console.error('Error fetching appointments:', error.message);
    } else {
      console.log('Fetched appointments:', data);
      setAppointments(data);
    }
    setLoading(false);
  };

  const handleDateChange = (appointmentId, value) => {
    setConfirmationDetails((prev) => ({
      ...prev,
      [appointmentId]: { ...prev[appointmentId], date: value },
    }));
  };

  const handleTimeChange = (appointmentId, value) => {
    setConfirmationDetails((prev) => ({
      ...prev,
      [appointmentId]: { ...prev[appointmentId], time: value },
    }));
  };

  const confirmAppointment = async (appointmentId) => {
    const { date, time } = confirmationDetails[appointmentId] || {};

    if (!date || !time) {
      alert("Please enter both date and time to confirm.");
      return;
    }

    const { error } = await supabase
      .from('appointments')
      .update({ status: 'confirmed', confirmed_date: date, confirmed_time: time })
      .eq('id', appointmentId);

    if (error) {
      console.error('Error confirming appointment:', error.message);
    } else {
      alert('Appointment confirmed!');
      fetchAppointments(doctorEmail); // Refresh list after confirming
    }
  };

  return (
    <div>
      <h2>Pending Appointment Requests</h2>
      {loading ? (
        <p>Loading appointments...</p>
      ) : appointments.length === 0 ? (
        <p>No pending appointments</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {appointments.map((appointment) => (
            <li key={appointment.id} style={{
              backgroundColor:'#e9f7f5',
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '16px',
              marginBottom: '12px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}>
              <h3 style={{ margin: '0 0 8px' }}>
                Appointment with: {appointment.patients?.name || 'Unknown Patient'} ({appointment.patient_email})
              </h3>
              <p style={{ margin: '0 0 8px' }}>
                Notes: {appointment.notes || 'No additional notes'}
              </p>
              <div style={{ margin: '8px 0' }}>
                <label>
                  Date:
                  <input
                    type="date"
                    value={confirmationDetails[appointment.id]?.date || ''}
                    onChange={(e) => handleDateChange(appointment.id, e.target.value)}
                    style={{ marginLeft: '8px' }}
                  />
                </label>
              </div>
              <div style={{ margin: '8px 0' }}>
                <label>
                  Time:
                  <input
                    type="time"
                    value={confirmationDetails[appointment.id]?.time || ''}
                    onChange={(e) => handleTimeChange(appointment.id, e.target.value)}
                    style={{ marginLeft: '8px' }}
                  />
                </label>
              </div>
              <button onClick={() => confirmAppointment(appointment.id)} style={{
                backgroundColor: '#40E0D0',
                color: 'black',
                padding: '8px 16px',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                marginTop: '8px'
              }}>
                Confirm
              </button>
              <p style={{
                fontSize: '12px',
                color: '#888',
                marginTop: '16px',
                textAlign: 'right'
              }}>
                Requested on: {new Date(appointment.created_at).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AppointmentRequests;

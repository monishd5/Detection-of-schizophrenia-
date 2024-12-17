import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import { getPatientEmail } from './getpatient';

const PatientProfile = () => {
  const [patientEmail, setPatientEmail] = useState('');
  const [patientName, setPatientName] = useState('');
  const [doctor, setDoctor] = useState(null);
  const [doctorEmailInput, setDoctorEmailInput] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch patient email and name on component mount
  useEffect(() => {
    const fetchPatientInfo = async () => {
      try {
        const email = await getPatientEmail();
        setPatientEmail(email);

        // Fetch the patient’s name from the 'Patients' table
        const { data, error } = await supabase
          .from('patients')
          .select('name')
          .eq('email', email)
          .single();

        if (error) {
          console.error('Error fetching patient name:', error);
        } else if (data) {
          setPatientName(data.name);
        }
      } catch (error) {
        console.error('Error fetching patient info:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPatientInfo();
  }, []);  // Empty dependency array ensures this only runs once when the component mounts

  // Fetch doctor connected to the patient (Only when needed)
  const fetchDoctor = async () => {
    try {
      const { data, error } = await supabase
        .from('connections')
        .select('doctor_email')
        .eq('patient_email', patientEmail)
        .eq('status', 'connected')
        .single();

      if (error) {
        console.error('Error fetching doctor:', error);
        setDoctor(null);  // No doctor connected
      } else {
        console.log("Fetched connection data:", data); // Log the fetched connection data
        if (data) {
          const doctorEmail = data.doctor_email;

          // Fetch the doctor's name using the email
          const { data: doctorData, error: doctorError } = await supabase
            .from('doctors')
            .select('name')
            .eq('email', doctorEmail)
            .single();

          if (doctorError) {
            console.error('Error fetching doctor name:', doctorError);
          } else {
            console.log('Doctor data:', doctorData);  // Log the fetched doctor data
            setDoctor({ name: doctorData.name, email: doctorEmail });
          }
        } else {
          console.log('No connection data found for this patient');
        }
      }
    } catch (error) {
      console.error('Error in fetchDoctor function:', error.message);
    }
  };

  // Fetch doctor details only if patientEmail is available
  useEffect(() => {
    if (patientEmail) {
      fetchDoctor();
    }
  }, [patientEmail]); // Fetch doctor when patientEmail changes

  // Handle connecting to a doctor
  const handleConnectDoctor = async () => {
    try {
      if (!patientEmail) {
        console.error("No patient email found.");
        return;
      }

      const doctorEmail = doctorEmailInput;
      if (!doctorEmail) {
        alert('Please enter a doctor email');
        return;
      }

      // Check if the doctor is already connected to the patient
      const { data, error } = await supabase
        .from('connections')
        .select('*')
        .eq('patient_email', patientEmail)
        .eq('doctor_email', doctorEmail)
        .single();

      if (data) {
        console.log("Connection already exists:", data);
        alert('You are already connected with this doctor.');
        return;
      }

      // Insert the new connection request
      const { data: newData, error: insertError } = await supabase
        .from('connections')
        .insert([
          {
            patient_email: patientEmail,
            doctor_email: doctorEmail,
            status: 'pending', // the status is 'pending' until the doctor approves
          },
        ]);

      if (insertError) {
        console.error("Error inserting connection:", insertError);
        alert(`Failed to send connection request: ${insertError.message}`);
      } else {
        console.log("Connection request sent:", newData);
        alert('Connection request sent to doctor.');

        // Fetch doctor details after successfully inserting the connection
        await fetchDoctor();
      }
    } catch (err) {
      console.error("Error connecting to doctor:", err);
      alert('An error occurred while connecting to the doctor.');
    }
  };

  // Handle removing the doctor connection
  const handleRemoveDoctor = async () => {
    try {
      const { error } = await supabase
        .from('connections')
        .delete()
        .eq('patient_email', patientEmail)
        .eq('doctor_email', doctor.email);

      if (error) {
        console.error('Error removing doctor connection:', error);
        alert('Failed to remove doctor.');
      } else {
        alert('Doctor connection removed.');
        setDoctor(null); // Clear connected doctor after removal
      }
    } catch (error) {
      console.error('Error in handleRemoveDoctor function:', error.message);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ maxWidth: '600px', margin: '20px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
      <h1 style={{ color: '#333', fontSize: '24px', marginBottom: '10px' }}>Patient Profile</h1>
      <p style={{ fontSize: '16px', color: '#555' }}>
        <strong>Name:</strong> {patientName}
      </p>
      <p style={{ fontSize: '16px', color: '#555' }}>
        <strong>Email:</strong> {patientEmail}
      </p>

      <h2 style={{ color: '#333', fontSize: '20px', marginTop: '20px', borderBottom: '1px solid #ddd', paddingBottom: '5px' }}>My Doctor</h2>
      {doctor ? (
        <div style={{ padding: '10px 0' }}>
          <p><strong>Name:</strong> {doctor.name}</p>
          <p><strong>Email:</strong> {doctor.email}</p>
          <button
            onClick={handleRemoveDoctor}
            style={{ marginTop: '10px', padding: '10px', fontSize: '16px', backgroundColor: '#FF6347', color: '#fff', borderRadius: '4px', border: 'none', cursor: 'pointer' }}
          >
            Remove Doctor
          </button>
        </div>
      ) : (
        <p style={{ color: '#777', fontSize: '14px' }}>No doctor connected.</p>
      )}

      <h3 style={{ color: '#333', fontSize: '18px', marginTop: '20px' }}>Connect to a Doctor</h3>
      <input
        type="email"
        value={doctorEmailInput}
        onChange={(e) => setDoctorEmailInput(e.target.value)}
        placeholder="Enter doctor email"
        style={{ width: 'calc(100% - 22px)', padding: '10px', fontSize: '16px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
      />
      <button
        onClick={handleConnectDoctor}
        style={{ width: '100%', padding: '10px', fontSize: '16px', backgroundColor: '#00DBFF', color: '#000', borderRadius: '4px', border: 'none', cursor: 'pointer' }}
      >
        Connect to Doctor
      </button>
    </div>
  );
};

export default PatientProfile;

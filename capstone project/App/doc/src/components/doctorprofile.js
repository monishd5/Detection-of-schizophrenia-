import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import { getDoctorEmail } from './getdoctorid';

const DoctorProfile = () => {
  const [doctorEmail, setDoctorEmail] = useState('');
  const [doctorName, setDoctorName] = useState('');
  const [patients, setPatients] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [newPatientEmail, setNewPatientEmail] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctorInfo = async () => {
      try {
        const email = await getDoctorEmail();
        setDoctorEmail(email);

        const { data, error } = await supabase
          .from('doctors')
          .select('name')
          .eq('email', email)
          .single();

        if (error) {
          console.error('Error fetching doctor name:', error);
        } else if (data) {
          setDoctorName(data.name);
        }

        await fetchPatients(email);
        await fetchPendingRequests(email);
      } catch (error) {
        console.error('Error fetching doctor info:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorInfo();
  }, []);

  const fetchPatients = async (email) => {
    try {
      const { data, error } = await supabase
        .from('connections')
        .select('patient_email')
        .eq('doctor_email', email)
        .eq('status', 'connected');

      if (error) {
        console.error('Error fetching patients:', error);
      } else {
        setPatients(data.map((entry) => entry.patient_email));
      }
    } catch (error) {
      console.error('Error in fetchPatients function:', error.message);
    }
  };

  const fetchPendingRequests = async (email) => {
    try {
      const { data, error } = await supabase
        .from('connections')
        .select('patient_email')
        .eq('doctor_email', email)
        .eq('status', 'pending');

      if (error) {
        console.error('Error fetching pending requests:', error);
      } else {
        setPendingRequests(data);
      }
    } catch (error) {
      console.error('Error in fetchPendingRequests function:', error.message);
    }
  };

  const handleAddPatient = async () => {
    if (!newPatientEmail) {
      alert('Please enter a patient email.');
      return;
    }

    try {
      const { data, error } = await supabase
        .from('connections')
        .insert([{
          patient_email: newPatientEmail,
          doctor_email: doctorEmail,
          status: 'pending',
        }]);

      if (error) {
        console.error('Error adding patient connection:', error);
        alert('Failed to add patient.');
      } else {
        alert('Connection request sent to patient.');
        setNewPatientEmail('');
      }
    } catch (error) {
      console.error('Error in handleAddPatient function:', error.message);
    }
  };

  const handleRequestAction = async (patientEmail, action) => {
    try {
      const status = action === 'accept' ? 'connected' : 'rejected';

      const { data, error } = await supabase
        .from('connections')
        .update({ status })
        .eq('doctor_email', doctorEmail)
        .eq('patient_email', patientEmail);

      if (error) {
        console.error('Error updating connection request:', error);
      } else {
        alert(`Request ${action} for ${patientEmail}`);
        fetchPendingRequests(doctorEmail); // Refresh the pending requests
      }
    } catch (error) {
      console.error('Error handling request action:', error);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{
      maxWidth: '600px',
      margin: '20px auto',
      padding: '20px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    }}>
      <h1 style={{
        color: '#333',
        fontSize: '24px',
        marginBottom: '10px',
      }}>
        Doctor Profile
      </h1>
      <p style={{
        fontSize: '16px',
        color: '#555',
      }}>
        <strong>Name:</strong> {doctorName}
      </p>
      <p style={{
        fontSize: '16px',
        color: '#555',
      }}>
        <strong>Email:</strong> {doctorEmail}
      </p>

      <h2 style={{
        color: '#333',
        fontSize: '20px',
        marginTop: '20px',
        borderBottom: '1px solid #ddd',
        paddingBottom: '5px',
      }}>
        My Patients
      </h2>
      {patients.length > 0 ? (
        <ul style={{
          listStyleType: 'none',
          padding: '0',
          color: '#444',
        }}>
          {patients.map((patient, index) => (
            <li key={index} style={{
              padding: '8px 0',
              borderBottom: '1px solid #eee',
            }}>
              {patient}
            </li>
          ))}
        </ul>
      ) : (
        <p style={{
          color: '#777',
          fontSize: '14px',
        }}>
          No patients connected.
        </p>
      )}

      <h3 style={{
        color: '#333',
        fontSize: '18px',
        marginTop: '20px',
      }}>
        Add a Patient
      </h3>
      <input
        type="email"
        value={newPatientEmail}
        onChange={(e) => setNewPatientEmail(e.target.value)}
        placeholder="Enter patient email"
        style={{
          width: 'calc(100% - 22px)',
          padding: '10px',
          fontSize: '16px',
          marginBottom: '10px',
          borderRadius: '4px',
          border: '1px solid #ddd',
        }}
      />
      <button
        onClick={handleAddPatient}
        style={{
          width: '100%',
          padding: '10px',
          fontSize: '16px',
          backgroundColor: '#00DBFF',
          color: '#000',
          borderRadius: '4px',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        Add Patient
      </button>

      <h3 style={{
        color: '#333',
        fontSize: '18px',
        marginTop: '30px',
      }}>
        Pending Connection Requests
      </h3>
      {pendingRequests.length > 0 ? (
        <ul style={{
          listStyleType: 'none',
          padding: '0',
          color: '#444',
        }}>
          {pendingRequests.map((request, index) => (
            <li key={index} style={{
              padding: '8px 0',
              borderBottom: '1px solid #eee',
            }}>
              <span>{request.patient_email}</span>
              <button
                onClick={() => handleRequestAction(request.patient_email, 'accept')}
                style={{
                  marginLeft: '10px',
                  padding: '5px 10px',
                  backgroundColor: 'green',
                  color: 'white',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Accept
              </button>
              <button
                onClick={() => handleRequestAction(request.patient_email, 'reject')}
                style={{
                  marginLeft: '10px',
                  padding: '5px 10px',
                  backgroundColor: 'red',
                  color: 'white',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Reject
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p style={{
          color: '#777',
          fontSize: '14px',
        }}>
          No pending connection requests.
        </p>
      )}
    </div>
  );
};

export default DoctorProfile;

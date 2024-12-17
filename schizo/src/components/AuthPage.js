// AuthPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css'; // Shared CSS

function AuthPage() {
  const navigate = useNavigate();

  const handlePatientLogin = () => {
    navigate('/patient-login'); // Navigate to patient login within the app
  };

  const handleDoctorLogin = () => {
    window.location.href = 'http://localhost:4000'; // Directly navigate to localhost:4000
  };

  return (
    <div className="auth-container">
      <h1>Are you a Doctor or a Patient?</h1>
      <div className="button-group">
        <button onClick={handleDoctorLogin} className="role-button">
          Doctor
        </button>
        <button onClick={handlePatientLogin} className="role-button">
          Patient
        </button>
      </div>
    </div>
  );
}

export default AuthPage;

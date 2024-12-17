import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import DoctorLoginSignup from './components/doctorlogin';
import Dashboard from './components/dashboard';
import AppointmentRequests from './components/appointmentres';
import DoctorAssignTasks from './components/dtasks';
import Navbar from './components/navbar';
import DoctorProfile from './components/doctorprofile';

function App() {
  return (
    <Router>
      <Routes>
        {/* Login route (no Navbar) */}
        <Route path="/" element={<DoctorLoginSignup />} />
        
        {/* Other routes with Navbar */}
        <Route element={<LayoutWithNavbar />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/appointments" element={<AppointmentRequests />} />
          <Route path="/tasks" element={<DoctorAssignTasks />} />
          <Route path="/profile" element ={<DoctorProfile /> } />
        </Route>
      </Routes>
    </Router>
  );
}

// Layout component that includes the Navbar
const LayoutWithNavbar = () => {
  const location = useLocation();

  // Check if the current route is the login page
  if (location.pathname === "/") {
    return <Routes><Route path="/" element={<DoctorLoginSignup />} /></Routes>;
  }

  return (
    <div>
      <Navbar /> {/* Render Navbar on all routes except the login page */}
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/appointments" element={<AppointmentRequests />} />
        <Route path="/tasks" element={<DoctorAssignTasks />} />
        <Route path="/profile" element ={<DoctorProfile /> } />
      </Routes>
    </div>
  );
};

export default App;

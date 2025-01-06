// routes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AuthPage from './components/AuthPage';
import DoctorLogin from './components/DoctorLogin';
import PatientLogin from './components/PatientLogin';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<AuthPage />} />
    <Route path="/doctor-login" element={<DoctorLogin />} />
    <Route path="/patient-login" element={<PatientLogin />} />
  </Routes>
);

export default AppRoutes;

import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import AuthPage from './components/AuthPage';
import LoginSignup from './components/DoctorLoginSignup';
import PatientLoginSignup from './components/PatientLoginSignup';
import Home from './components/Home';
import SchizophreniaKnowledgeQA from './components/resource';
import MoodTracker from './components/mood';
import MeditationPage from './components/relax';
import RelaxAndPlay from './components/games';
import RelaxAndPlay2048 from './components/2048';
import Diff from './components/differnc';
import Music from './components/musical';
import RequestAppointment from './components/appointmentreq';
import Appointments from './components/pappointment';
import PatientTasks from './components/ptasks';
import Car from './components/cargame';
import PatientProfile from './components/profile';
import Disappointment from './components/appointmentout';
import Wizardgame from './components/wizard';
import Illuminati from './components/illuminate';
import Viking from './components/viking';
import Balance from './components/balancing';
import Navbar from './components/navbar';

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth Routes */}
        <Route path="/" element={<AuthPage />} />
        <Route path="/doctor-login" element={<LoginSignup />} />
        <Route path="/patient-login" element={<PatientLoginSignup />} />

        {/* Routes with Navbar */}
        <Route element={<LayoutWithNavbar />}>
          <Route path="/home" element={<Home />} />
          <Route path="/schizophrenia-qa" element={<SchizophreniaKnowledgeQA />} />
          <Route path="/mood-tracker" element={<MoodTracker />} />
          <Route path="/relaxation" element={<MeditationPage />} />
          <Route path="/games" element={<RelaxAndPlay />} />
          <Route path="/games/2048" element={<RelaxAndPlay2048 />} />
          <Route path="/games/findthedifference" element={<Diff />} />
          <Route path="/games/music" element={<Music />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/appointment-request" element={<RequestAppointment />} />
          <Route path="/tasks" element={<PatientTasks />} />
          <Route path="/games/cargame" element={<Car />} />
          <Route path="/profile" element={<PatientProfile />} />
          <Route path="/games/wizard" element={<Wizardgame />} />
          <Route path="/games/illuminate" element={<Illuminati />} />
          <Route path="/games/viking" element={<Viking />} />
          <Route path="/games/balanceit" element={<Balance />} />
          <Route path="/appointmentshome" element={<Disappointment />} />
        </Route>
      </Routes>
    </Router>
  );
}

const LayoutWithNavbar = () => {
  const location = useLocation();

  // Hide Navbar for authentication routes
  if (location.pathname === "/" || location.pathname === "/patient-login" || location.pathname === "/doctor-login") {
    return null;
  }

  return (
    <div>
      <Navbar />
      <Routes>
        {/* Routes with Navbar */}
        <Route path="/home" element={<Home />} />
        <Route path="/schizophrenia-qa" element={<SchizophreniaKnowledgeQA />} />
        <Route path="/mood-tracker" element={<MoodTracker />} />
        <Route path="/relaxation" element={<MeditationPage />} />
        <Route path="/games" element={<RelaxAndPlay />} />
        <Route path="/games/2048" element={<RelaxAndPlay2048 />} />
        <Route path="/games/findthedifference" element={<Diff />} />
        <Route path="/games/music" element={<Music />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/appointment-request" element={<RequestAppointment />} />
        <Route path="/tasks" element={<PatientTasks />} />
        <Route path="/games/cargame" element={<Car />} />
        <Route path="/profile" element={<PatientProfile />} />
        <Route path="/games/wizard" element={<Wizardgame />} />
        <Route path="/games/illuminate" element={<Illuminati />} />
        <Route path="/games/viking" element={<Viking />} />
        <Route path="/games/balanceit" element={<Balance />} />
        <Route path="/appointmentshome" element={<Disappointment />} />
      </Routes>
    </div>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import DoctorDashboard from './DoctorDashboard';
import RegisterPatient from './RegisterPatient';
import ViewHistory from './ViewHistory';
import logo from './assets/symptom.png';
import './index.css';

function App() {
  return (
    <Router>
      <div className="header">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <div className="nav-buttons">
        <a href="/login">
          <button className="inactive-button">Iniciar sesión</button>
        </a>
        <a href="/register">
          <button className="inactive-button">Registrarse</button>
        </a>
      </div>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
        <Route path="/register-patient" element={<RegisterPatient />} />
        <Route path="/view-history" element={<ViewHistory />} />
      </Routes>
    </Router>
  );
}

export default App;

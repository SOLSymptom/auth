import { useNavigate } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import './index.css';

function DoctorDashboard({ setView }) {
  const navigate = useNavigate();

  return (
    <div className="login-container">
      <h2>Panel del Doctor</h2>

      <button className="btn" onClick={() => navigate('/register-patient')}>
        Registrar síntomas
      </button>

      <button className="btn" onClick={() => navigate('/view-history')}>
        Ver historial
      </button>

      <button
        className="btn"
        style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        onClick={() => navigate('login')}
      >
        <FiLogOut style={{ marginRight: '8px' }} />
        Cerrar sesión
      </button>
    </div>
  );
}

export default DoctorDashboard;

import { useState } from 'react';
import axios from 'axios';
import './index.css';

function ViewHistory({ setView }) {
  const [cedula, setCedula] = useState('');
  const [historial, setHistorial] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:8001/symptoms/${cedula}`);
      setHistorial(response.data.historial);
    } catch (err) {
      setHistorial([]);
    }
  };

  return (
    <div className="login-container">
      <h2>Historial clínico</h2>
      <input
        type="text"
        placeholder="Cédula"
        value={cedula}
        onChange={(e) => setCedula(e.target.value)}
      />
      <button onClick={handleSearch}>Buscar</button>

      <button className="btn" onClick={() => setView('dashboard')}>
        Volver al panel
      </button>

      <ul>
        {historial.map((item, index) => (
          <li key={index}>
            Fecha: {item.fecha} <br />
            Ciudad: {item.ciudad} <br />
            Edad: {item.edad} años <br />
            Tipo de sangre: {item.tipo_sangre} <br />
            Síntomas: {item.sintomas.join(', ')}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ViewHistory;

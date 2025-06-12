import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './index.css';

function RegisterPatient() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    cedula: '',
    nombres: '',
    apellidos: '',
    ciudad: '',
    edad: '',
    tipo_sangre: '',
    correo: '',
    telefono: '',
    sintomas: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        edad: parseInt(formData.edad),
        sintomas: formData.sintomas.split(',').map(s => s.trim())
      };
      await axios.post('http://localhost:8001/register-patient', payload);
      setMessage('Paciente registrado exitosamente');
    } catch (error) {
      setMessage('Error al registrar paciente');
    }
  };

  return (
    <div className="login-container">
      <h2>Registrar paciente</h2>
      <form onSubmit={handleSubmit}>
        <input name="cedula" placeholder="Cédula" value={formData.cedula} onChange={handleChange} required />
        <input name="nombres" placeholder="Nombres" value={formData.nombres} onChange={handleChange} required />
        <input name="apellidos" placeholder="Apellidos" value={formData.apellidos} onChange={handleChange} required />
        <input name="ciudad" placeholder="Ciudad" value={formData.ciudad} onChange={handleChange} required />
        <input name="edad" type="number" placeholder="Edad" value={formData.edad} onChange={handleChange} required />
        <input name="tipo_sangre" placeholder="Tipo de sangre" value={formData.tipo_sangre} onChange={handleChange} required />
        <input name="correo" type="email" placeholder="Correo electrónico" value={formData.correo} onChange={handleChange} required />
        <input name="telefono" placeholder="Teléfono" value={formData.telefono} onChange={handleChange} required />
        <input name="sintomas" placeholder="Síntomas (separados por coma)" value={formData.sintomas} onChange={handleChange} required />
        <button type="submit">Registrar</button>
      </form>

      <div className="return-btn-container">
        <button className="btn" onClick={() => navigate('/doctor-dashboard')}>
          Volver al panel
        </button>
      </div>

      {message && <p className="message-text">{message}</p>}
    </div>
  );
}

export default RegisterPatient;

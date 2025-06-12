import { useState } from 'react';
import axios from 'axios';
import './index.css';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://symptom-alb-1813527344.us-east-1.elb.amazonaws.com/api/auth/register', {
        username,
        password,
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Error al registrar');
    }
  };

  return (
    <div className="login-container">
      <h2>Registro</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Registrar</button>
      </form>
      {message && <p style={{ marginTop: '1rem' }}>{message}</p>}
    </div>
  );
}

export default Register;

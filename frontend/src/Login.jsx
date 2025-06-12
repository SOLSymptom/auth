import { useState } from 'react';
import axios from 'axios';
import './index.css';

function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState(null);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://symptom-alb-1813527344.us-east-1.elb.amazonaws.com/api/auth/login', {
        username,
        password,
      });
      setToken(response.data.access_token);
      setError('');
      if (onLoginSuccess) onLoginSuccess();
    } catch (err) {
      setToken(null);
      setError('Credenciales inválidas o servidor no disponible');
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleLogin}>
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
        <button type="submit">Entrar</button>
      </form>
      {token && <p style={{ color: 'green' }}>Token recibido: {token}</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default Login;

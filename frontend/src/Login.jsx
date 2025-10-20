import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // <-- import this
import './Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // <-- initialize navigate

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('✅ Login successful');

        // Save the JWT token in localStorage for protected routes
        localStorage.setItem('token', data.token);

        // Redirect to Dashboard after 1 second
        setTimeout(() => navigate('/dashboard'), 1000);
      } else {
        setMessage(`❌ ${data.message || 'Login failed'}`);
      }
    } catch (err) {
      console.error(err);
      setMessage('❌ Server error');
    }
  };

  return (
    <div className="login-page">
      {/* Header */}
      <header className="login-header">
        <h1>SmartTanker&nbsp;
          <i className="fa-solid fa-truck moving-icon"></i>
        </h1>
      </header>

      {/* Form */}
      <div className="login-container">
        <form className="login-form" onSubmit={handleLogin}>
          <h2>Login&nbsp;<i className="fa-solid fa-droplet"></i></h2>
          <input
            type="email"
            placeholder="✉️ Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="login-input"
          />
          <input
            type="password"
            placeholder="🔒 Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="login-input"
          />
          <button type="submit" className="login-button">Submit</button>
          {message && <p className="login-message">{message}</p>}
        </form>
      </div>
    </div>
  );
}

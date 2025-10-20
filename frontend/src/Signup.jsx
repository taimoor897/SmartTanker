import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

export default function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });

      const data = await res.json();
      if (res.ok) {
        setMessage('✅ Account created successfully');
        setTimeout(() => navigate('/login'), 1500);
      } else {
        setMessage(`❌ ${data.message || 'Signup failed'}`);
      }
    } catch (err) {
      setMessage('❌ Server error');
    }
  };

  return (
    <div className="signup-page">
      {/* Header */}
      <header className="signup-header">
        <h1>SmartTanker&nbsp;
<i className="fa-solid fa-truck moving-icon"></i></h1>
      </header>

      {/* Form */}
      <div className="signup-container">
        <form className="signup-form" onSubmit={handleSignup}>
          <h2>Sign Up&nbsp;<i className="fa-solid fa-droplet"></i></h2>
          <input
           
            type="text"
             
            placeholder="👤 Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required 
            className="signup-input"
          />
          <input
            type="email"
            placeholder="✉️&nbsp;Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="signup-input"
          />
          <input
            type="password"
            placeholder="🔒Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="signup-input"
          />
          <button type="submit" className="signup-button">Submit</button>
          {message && <p className="signup-message">{message}</p>}
        </form>
      </div>
    </div>
  );
}

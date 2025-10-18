import React, { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

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
        // Save token (if returned)
        // localStorage.setItem('token', data.token);
        // Redirect to dashboard
        // window.location.href = '/';
      } else {
        setMessage(`❌ ${data.message || 'Login failed'}`);
      }
    } catch (err) {
      console.error(err);
      setMessage('❌ Server error');
    }
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleLogin}>
        <h2 style={styles.title}>🔐 Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Login</button>
        {message && <p style={styles.message}>{message}</p>}
      </form>
    </div>
  );
}

const styles = {
  container: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f0f4f8' },
  form: { background: '#fff', padding: 30, borderRadius: 10, boxShadow: '0 0 10px rgba(0,0,0,0.1)', width: 300 },
  title: { textAlign: 'center', marginBottom: 20 },
  input: { width: '100%', padding: 8, margin: '8px 0', border: '1px solid #ccc', borderRadius: 5 },
  button: { width: '100%', padding: 10, background: '#007bff', color: '#fff', border: 'none', borderRadius: 5, cursor: 'pointer' },
  message: { marginTop: 10, textAlign: 'center' }
};

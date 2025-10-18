import React, { useState } from 'react';

export default function Signup() {
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
        setName('');
        setEmail('');
        setPassword('');
      } else {
        setMessage(`❌ ${data.message || 'Signup failed'}`);
      }
    } catch (err) {
      console.error(err);
      setMessage('❌ Server error');
    }
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleSignup}>
        <h2 style={styles.title}>📝 Sign Up</h2>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={styles.input}
        />
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
        <button type="submit" style={styles.button}>Sign Up</button>
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
  button: { width: '100%', padding: 10, background: '#28a745', color: '#fff', border: 'none', borderRadius: 5, cursor: 'pointer' },
  message: { marginTop: 10, textAlign: 'center' }
};

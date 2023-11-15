import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Auth.css'; // Import your CSS file

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    // Implement your login logic here (e.g., make an API call)
    // Update the following placeholder code accordingly

    try {
      const response = await fetch('http://desktop-2mkb6m2:8080/WebChat-1.0-SNAPSHOT/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          passwordHash: password, // Assuming you are using password hash in your API
        }),
      });

      if (response.ok) {
        const data = await response.json();
        // Store the token in localStorage or state
        localStorage.setItem('token', data.token);
        // Redirect to the home page or wherever you want
        navigate('/');
      } else {
        // Handle login failure
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;

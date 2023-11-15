import React, { useState } from 'react';
import './styles/Auth.css'; // Import your CSS file
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    // Implement your register logic here (e.g., make an API call)
    // Update the following placeholder code accordingly

    try {
      const response = await fetch('http://desktop-2mkb6m2:8080/WebChat-1.0-SNAPSHOT/api/register', {
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
        // Handle successful registration
        console.log('User registered successfully');
        navigate('/login')
        
      } else {
        // Handle registration failure
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
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
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default Register;

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import Login from './Components/Login'; // Import your Login component
import Register from './Components/Register'; // Import your Register component
import './App.css'
import ChatPage from './Components/ChatPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="chat/*" element={<ChatPage/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;


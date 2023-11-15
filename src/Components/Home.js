import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setLoggedIn } from '../state/actions/loggedInActions';
import { jwtDecode } from 'jwt-decode';
import './styles/Home.css';
import { setUserId } from '../state/actions/userIdActions';
import { setChats } from '../state/actions/chatActions'; // Import the new action
import CreateChatForm from './chatForm';

const Home = () => {
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const [showMenu, setShowMenu] = useState(false);
  const chats = useSelector((state) => state.chat.chats); // Access chats from Redux store
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      dispatch(setUserId(decodedToken.user_id));
      dispatch(setLoggedIn(true));

      // Fetch chats only if userId is available
      if (decodedToken.user_id !== null && decodedToken.user_id !== undefined) {
        fetchChats(decodedToken.user_id);
      }
    } else {
      dispatch(setLoggedIn(false));
    }
  }, [dispatch]);

  const logOut = () => {
    localStorage.removeItem('token');
    dispatch(setLoggedIn(false));
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const fetchChats = async (userId) => {
    try {
      if (userId !== undefined && userId !== null) {
        const response = await fetch(`http://desktop-2mkb6m2:8080/WebChat-1.0-SNAPSHOT/api/data-provider/get-chats-by-user-id?userId=${userId}`);
        if (response.ok) {
          const data = await response.json();
          dispatch(setChats(data)); // Update Redux store with chats
        } else {
          console.error('Failed to fetch chats');
        }
      } else {
        console.log('userId is undefined or null');
      }
    } catch (error) {
      console.error('Error fetching chats', error);
    }
  };

  const handleChatClick = (chatRoomId) => {
    navigate(`/chat?chatRoomId=${parseInt(chatRoomId)}`);
  };

  return (
    <div className="container">
      {loggedIn ? (
        <div>
          <h1>Welcome to Chat App!</h1>
          <p>Please create a chat or enter an existing conversation.</p>
          <button onClick={logOut}>Log Out</button>
          <div className={`android-menu ${showMenu ? 'show' : ''}`}>
            <p>Your Chats</p>
            <ul>
              {chats.map((chat) => (
                <li key={chat.chatRoomId} onClick={() => handleChatClick(chat.chatRoomId)}>
                  {chat.name}
                </li>
              ))}
            </ul>
            <button onClick={toggleMenu}>Закрыть чаты</button>
          </div>
          <button onClick={toggleMenu}>Открыть чаты</button>
          <CreateChatForm /> {/* Add the new component here */}
        </div>
      ) : (
        <div>
          <h1>Welcome to Chat App!</h1>
          <p>Please login or register to start a conversation.</p>
          <Link to="/login" className="button">
            Log In
          </Link>
          <Link to="/register" className="button">
            Register
          </Link>
        </div>
      )}
    </div>
  );
};

export default Home;

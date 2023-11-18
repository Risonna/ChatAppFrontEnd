import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setLoggedIn } from '../state/actions/loggedInActions';
import { jwtDecode } from 'jwt-decode';
import './styles/Home.css';
import { setUserId } from '../state/actions/userIdActions';
import { fetchChats, setChats } from '../state/actions/chatActions'; // Import the new action
import CreateChatForm from './chatForm';

const Home = () => {
  const [showMenu, setShowMenu] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const chats = useSelector((state) => state.chat.chats); // Access chats from Redux store
  const userId = useSelector((state) => state.userId.userId)

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      dispatch(setUserId(decodedToken.user_id));
      dispatch(setLoggedIn(true));

      // Fetch chats only if userId is available
      if (decodedToken.user_id !== null && decodedToken.user_id !== undefined) {
        dispatch(setUserId(decodedToken.user_id));
        fetchChatsFun();
      }
    } else {
      dispatch(setLoggedIn(false));
    }
  }, [dispatch]);

  useEffect(() => {
    const socket = new WebSocket(`ws://localhost:8080/WebChat-1.0-SNAPSHOT/messageSocket/${userId}`); // Adjust the URL based on your backend server

    socket.onopen = () => {
        console.log('WebSocket connection opened');
    };

    socket.onmessage = (event) => {
        if(event.data === 'Chats_Updated'){
          console.log('Received message on chats updating!');
            fetchChatsFun();
        }
    };

    socket.onclose = () => {
        console.log('WebSocket connection closed');
    };

    return () => {
        socket.close();
    };
}, []);

  const logOut = () => {
    localStorage.removeItem('token');
    dispatch(setLoggedIn(false));
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const fetchChatsFun = async () => {
    dispatch(fetchChats(userId));

  };

  const handleChatClick = (chatRoomId) => {
    navigate(`/chat?chatRoomId=${parseInt(chatRoomId)}`);
  };

  return (
    <div className="container">
      {loggedIn ? (
        <div>
          <h1>Добро пожаловать в чат-мессенджер</h1>
          <p>Создайте новый чат или войдите в существующий</p>
          <button className="logout-button" onClick={logOut}>
            Выйти
          </button>
          <div className={`android-menu ${showMenu ? 'show' : ''}`}>
            <p>Ваши чаты:</p>
            <ul>
              {chats.map((chat) => (
                <li key={chat.chatRoomId} onClick={() => handleChatClick(chat.chatRoomId)}>
                  {chat.name}
                </li>
              ))}
            </ul>
            <button className="close-button" onClick={toggleMenu}>
              Закрыть чаты
            </button>
          </div>
          <button className="open-button" onClick={toggleMenu}>
            Открыть чаты
          </button>
          <CreateChatForm />
        </div>
      ) : (
        <div>
          <h1>Добро пожаловать в чат-мессенджер</h1>
          <p>Войдите или зарегистрируйтесь, чтобы начать общаться</p>
          <Link to="/login" className="auth-button login-button">
            Войти
          </Link>
          <Link to="/register" className="auth-button register-button">
            Зарегистрироваться
          </Link>
        </div>
      )}
    </div>
  );
};

export default Home;

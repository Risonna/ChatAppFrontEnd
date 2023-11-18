import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setLoggedIn } from '../state/actions/loggedInActions';
import { setUserId } from '../state/actions/userIdActions';
import './styles/CreateChatForm.css'; // Import your CSS file
import { createChat } from '../state/actions/chatActions';
import { fetchAllUsers } from '../state/actions/allUsersActions';

const CreateChatForm = () => {
  const dispatch = useDispatch();

  const [chatRoomName, setChatRoomName] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const allUsers = useSelector((state) => state.allUsers.allUsers) || [];

  const [searchTerm, setSearchTerm] = useState('');

  const userId = useSelector((state) => state.userId.userId);

  useEffect(() => {
    // Fetch all users when the component mounts
    dispatch(fetchAllUsers());
    console.log(allUsers);
  }, []);


  const handleUserSelect = (userId) => {
    setSelectedUsers((prevSelected) => {
      if (prevSelected.includes(userId)) {
        return prevSelected.filter((id) => id !== userId);
      } else {
        return [...prevSelected, userId];
      }
    });
  };
  const createChatFun = async () => {
    dispatch(createChat(chatRoomName, selectedUsers, userId));
  };

  const filteredUsers = allUsers.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="create-chat-form">
      <h1>Создайте новый чат</h1>
      <label>
        Введите название чата:
        <input type="text" value={chatRoomName} onChange={(e) => setChatRoomName(e.target.value)}
        placeholder="Название чата" />
      </label>
      <label>
        Найти пользователей:
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Найти по имени пользователя"
        />
      </label>
      <label>
        Выберите пользователей:
        <div className="user-list">
          <div className="user-list-scroll">
            {filteredUsers.map((user) => {
              if(user.userId !== userId){
              return <div key={user.userId} className="user-item">
                <input
                  type="checkbox"
                  id={`user-${user.userId}`}
                  checked={selectedUsers.includes(user.userId)}
                  onChange={() => handleUserSelect(user.userId)}
                />
                <label htmlFor={`user-${user.userId}`}>{user.username}</label>
              </div>
              }
              else{
                return "";
              }
            })}
          </div>
        </div>
      </label>
      <button onClick={createChatFun}>Создать чат</button>
    </div>
  );
};

export default CreateChatForm;

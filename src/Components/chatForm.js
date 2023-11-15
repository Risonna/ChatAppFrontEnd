import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setLoggedIn } from '../state/actions/loggedInActions';
import { setUserId } from '../state/actions/userIdActions';
import './styles/CreateChatForm.css'; // Import your CSS file

const CreateChatForm = () => {
  const dispatch = useDispatch();

  const [chatRoomName, setChatRoomName] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch all users when the component mounts
    fetchAllUsers();
  }, []);

  const fetchAllUsers = async () => {
    try {
      const response = await fetch('http://desktop-2mkb6m2:8080/WebChat-1.0-SNAPSHOT/api/data-provider/get-all-users');

      if (response.ok) {
        const data = await response.json();
        setAllUsers(data);
      } else {
        console.error('Failed to fetch all users');
      }
    } catch (error) {
      console.error('Error fetching all users', error);
    }
  };

  const handleUserSelect = (userId) => {
    setSelectedUsers((prevSelected) => {
      if (prevSelected.includes(userId)) {
        return prevSelected.filter((id) => id !== userId);
      } else {
        return [...prevSelected, userId];
      }
    });
  };
  const createChat = async () => {
    try {
      // Split user IDs into an array of integers
      console.log(selectedUsers);
      const userIdsArray = selectedUsers;

      // Create an array of objects with the same roomname and different userIds
      const chatData = userIdsArray.map(userId => 
        ({ chatRoomName: chatRoomName, userId }));

      const response = await fetch('http://desktop-2mkb6m2:8080/WebChat-1.0-SNAPSHOT/api/data-provider/create-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(chatData),
      });

      if (response.ok) {
        // If the chat is created successfully, you might want to redirect to the home page or the newly created chat
      } else {
        console.error('Failed to create chat');
      }
    } catch (error) {
      console.error('Error creating chat', error);
    }
  };

  const filteredUsers = allUsers.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="create-chat-form">
      <h1>Create a New Chat</h1>
      <label>
        Chat Room Name:
        <input type="text" value={chatRoomName} onChange={(e) => setChatRoomName(e.target.value)} />
      </label>
      <label>
        Search Users:
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by username"
        />
      </label>
      <label>
        Select Users:
        <div className="user-list">
          <div className="user-list-scroll">
            {filteredUsers.map((user) => (
              <div key={user.userId} className="user-item">
                <input
                  type="checkbox"
                  id={`user-${user.userId}`}
                  checked={selectedUsers.includes(user.userId)}
                  onChange={() => handleUserSelect(user.userId)}
                />
                <label htmlFor={`user-${user.userId}`}>{user.username}</label>
              </div>
            ))}
          </div>
        </div>
      </label>
      <button onClick={createChat}>Create Chat</button>
    </div>
  );
};

export default CreateChatForm;

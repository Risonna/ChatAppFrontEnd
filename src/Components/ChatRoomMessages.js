import React, { useEffect, useState } from 'react';
import './styles/ChatRoomMessages.css';
import { useDispatch, useSelector } from 'react-redux';

const ChatRoomMessages = ({ chatRoomId }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const userId = useSelector((state) => state.userId.userId);
    const allUsers = useSelector((state) => state.allUsers.allUsers) || [];

    // Create a mapping of userId to username
    const userIdToUsernameMap = {};
    allUsers.forEach((user) => {
        userIdToUsernameMap[user.userId] = user.username;
    });

    const handleSendMessage = async () => {
        try {
            // Validate if the message is not empty
            if (!newMessage.trim()) {
                return;
            }

            // Create a new message object
            const message = {
                userId: userId,
                chatRoomId: parseInt(chatRoomId),
                content: newMessage,
            };

            // Send the message to the backend
            const response = await fetch('http://desktop-2mkb6m2:8080/WebChat-1.0-SNAPSHOT/api/data-provider/create-message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(message),
            });

            if (response.ok) {
                // If the message is sent successfully, fetch the updated messages
                fetchMessages();
                // Clear the input field
                setNewMessage('');
            } else {
                console.error('Failed to send message');
            }
        } catch (error) {
            console.error('Error sending message', error);
        }
    };

    const fetchMessages = async () => {
        try {
            const parsedChatRoomId = parseInt(chatRoomId);
            const response = await fetch(`http://desktop-2mkb6m2:8080/WebChat-1.0-SNAPSHOT/api/data-provider/get-messages-for-chat-room?chatRoomId=${parsedChatRoomId}`);

            if (response.ok) {
                const data = await response.json();
                setMessages(data);
            } else {
                console.error('Failed to fetch messages');
            }
        } catch (error) {
            console.error('Error fetching messages', error);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    useEffect(() => {
        const socket = new WebSocket(`ws://localhost:8080/WebChat-1.0-SNAPSHOT/messageSocket/${parseInt(userId)}`); // Adjust the URL based on your backend server

        socket.onopen = () => {
            console.log('WebSocket connection opened');
        };

        socket.onmessage = (event) => {
            if (event.data === 'Messages_Updated') {
                console.log('Messages updated!')
                fetchMessages();
            }
        };

        socket.onclose = () => {
            console.log('WebSocket connection closed');
        };

        return () => {
            socket.close();
        };
    }, []);

    useEffect(() => {
        // Scroll to the bottom when messages change
        const chatRoom = document.getElementById('chat-room');
        if (chatRoom) {
            chatRoom.scrollTop = chatRoom.scrollHeight;
        }
    }, [messages]);

    const handleTriggerAsyncLogic = async () => {
        try {
             // Validate if the message is not empty
             if (!newMessage.trim()) {
                return;
            }

            // Create a new message object
            const message = {
                userId: userId,
                chatRoomId: parseInt(chatRoomId),
                content: newMessage,
            };

            // Send a request to trigger asynchronous logic on the backend
            const response = await fetch('http://desktop-2mkb6m2:8080/WebChat-1.0-SNAPSHOT/api/data-provider/create-message-async', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                // You can include any payload if needed
                body: JSON.stringify(message),
            });

            if (response.ok) {
                console.log('Asynchronous logic triggered successfully');
            } else {
                console.error('Failed to trigger asynchronous logic');
            }
        } catch (error) {
            console.error('Error triggering asynchronous logic', error);
        }
    };


    return (
        <div style={{ display: 'grid', justifyItems: 'center' }}>
            <div style={{ justifyItems: 'center', display: 'grid' }} className='fixed'>
                <div className="chat-room-messages" id="chat-room">
                    <ul>
                        {messages.map((message, index) => (
                            <li
                                key={message.messageId}
                                className={message.userId === userId ? 'right' : 'left'}
                            >
                                <div className="message-content">
                                    <p className="message-username">
                                        {userIdToUsernameMap[message.userId]}
                                    </p>
                                    <p style={{ textAlign: '-webkit-left' }}>
                                        {message.content}
                                    </p>
                                    <span className="message-date">
                                        {new Date(message.createdAt).toLocaleString()}
                                    </span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="message-input-container">
                    <input
                        type="text"
                        placeholder="Type your message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        style={{ overflowY: 'auto' }}
                    />
                    <button className="sendMessage" onClick={handleSendMessage}>
                        Отправить
                    </button>
                    <button className="sendMessage" onClick={handleTriggerAsyncLogic}>
                        Отправить асинхронно
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatRoomMessages;

import React, { useEffect, useState } from 'react';
import './styles/ChatRoomMessages.css';
import { useDispatch, useSelector } from 'react-redux';

const ChatRoomMessages = ({ chatRoomId }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const userId = useSelector((state) => state.userId.userId);

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

    return (
        <div style={{ display: 'grid', justifyItems: 'center'}}>
            <div style={{justifyItems: 'center', display: 'grid'}} className='fixed'>
                <div className="chat-room-messages">
                    <ul>
                        {messages.map((message) => (
                            <li key={message.messageId} className={message.userId === userId ? 'right' : 'left'}>
                                <div className="message-content">
                                    <p>{message.content}</p>
                                    <span className="message-date">{new Date(message.createdAt).toLocaleString()}</span>
                                </div>
                            </li>
                        )
                        )}
                    </ul>
                </div>
                <div className="message-input-container">
                    <input
                        type="text"
                        placeholder="Type your message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <button className="sendMessage" onClick={handleSendMessage}>Send</button>
                </div>
            </div>
        </div>

    );
};

export default ChatRoomMessages;

// actions/chatActions.js
export const setChats = (chats) => {
  return {
    type: 'SET_CHATS',
    payload: chats,
  };
};

// actions/chatActions.js
export const createChat = (chatRoomName, selectedUsers, userId) => {
  return async (dispatch) => {
    try {
      // Split user IDs into an array of integers
      console.log(selectedUsers);
      const userIdsArray = selectedUsers;
      if (!userIdsArray.includes(userId)) {
        userIdsArray.push(userId);
      }
      console.log(selectedUsers);

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
};

export const fetchChats = (userId) => {
  return async (dispatch) => {
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
};


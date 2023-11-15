// actions/chatActions.js
export const setChats = (chats) => {
    return {
      type: 'SET_CHATS',
      payload: chats,
    };
  };
  
  // actions/chatActions.js
export const createChat = (chatRoom, userIds) => {
    return async (dispatch) => {
      try {
        const response = await fetch('http://desktop-2mkb6m2:8080/WebChat-1.0-SNAPSHOT/api/data-provider/create-chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ chatRoom, userIds }),
        });
  
        if (response.ok) {
          // If chat creation is successful, you might want to fetch updated chats
          // or update the chat list in your Redux store
          // Example: dispatch(fetchChats(loggedInUserId));
          console.log('Chat created successfully');
        } else {
          console.error('Failed to create chat');
        }
      } catch (error) {
        console.error('Error creating chat', error);
      }
    };
  };
  
  
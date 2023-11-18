const initialState = {
    allUsers: null,
  };
  
  const allUsersReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_ALL_USERS':
        return { ...state, allUsers: action.payload };
      default:
        return state;
    }
  };
  
  export default allUsersReducer;
  
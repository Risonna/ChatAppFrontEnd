export const setAllUsers = (allUsers) => ({
    type: 'SET_ALL_USERS',
    payload: allUsers,
  });
  
  export const fetchAllUsers = () => {
    return async (dispatch) => {
        try {
            const response = await fetch('http://desktop-2mkb6m2:8080/WebChat-1.0-SNAPSHOT/api/data-provider/get-all-users');
      
            if (response.ok) {
              const data = await response.json();
              dispatch(setAllUsers(data));
            } else {
              console.error('Failed to fetch all users');
            }
          } catch (error) {
            console.error('Error fetching all users', error);
          }
    };
  };
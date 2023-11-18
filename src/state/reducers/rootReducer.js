// rootReducer.js
import { combineReducers } from 'redux';
import authReducer from './authReducer';
import userIdReducer from './userIdReducer';
import chatReducer from './chatReducer';
import allUsersReducer from './allUsersReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  userId: userIdReducer,
  chat: chatReducer,
  allUsers: allUsersReducer,
  // Add other reducers if needed
});

export default rootReducer;

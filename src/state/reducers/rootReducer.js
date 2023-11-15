// rootReducer.js
import { combineReducers } from 'redux';
import authReducer from './authReducer';
import userIdReducer from './userIdReducer';
import chatReducer from './chatReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  userId: userIdReducer,
  chat: chatReducer,
  // Add other reducers if needed
});

export default rootReducer;

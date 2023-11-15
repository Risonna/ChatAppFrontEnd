import { createStore, combineReducers, applyMiddleware } from 'redux';
import rootReducer from './reducers/rootReducer';
import thunk from 'redux-thunk';
// persist store code
const loadState = () => {
    try {
      const serializedState = localStorage.getItem('state');
      if(serializedState === null) {
        return undefined;
      }
      return JSON.parse(serializedState);
    } catch (e) {
      return undefined;
    }
  };
  
  const saveState = (state) => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem('state', serializedState);
    } catch (e) {
      // Ignore write errors;
    }
  };
  
  const persistedState = loadState();
// Create Redux store
const store = createStore(rootReducer, persistedState, applyMiddleware(thunk));
// This is actually call every time when store saved
store.subscribe(() => {
    saveState(store.getState());
  });
export default store;
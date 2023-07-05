import { combineReducers } from 'redux';
/* Instruments */
import { chatSlice, contactSlice, roomSlice } from './slices';

const rootReducers = combineReducers({
  [roomSlice.name]: roomSlice.reducer,
  [chatSlice.name]: chatSlice.reducer,
  [contactSlice.name]: contactSlice.reducer,
});

export default rootReducers;

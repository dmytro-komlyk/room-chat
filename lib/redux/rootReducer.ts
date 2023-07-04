import { combineReducers } from 'redux';
/* Instruments */
import { chatSlice, roomSlice } from './slices';

const rootReducers = combineReducers({
  [roomSlice.name]: roomSlice.reducer,
  [chatSlice.name]: chatSlice.reducer,
});

export default rootReducers;

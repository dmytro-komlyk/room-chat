import { combineReducers } from 'redux';
/* Instruments */
import { roomSlice } from './slices';

const rootReducers = combineReducers({
  [roomSlice.name]: roomSlice.reducer,
});

export default rootReducers;

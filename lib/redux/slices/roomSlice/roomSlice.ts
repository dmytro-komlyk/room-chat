import { IRoom } from '@/common/types';
import { createSlice, isAnyOf, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from '../../store';
import {
  applyRoom,
  createRoom,
  deleteRoom,
  loadRooms,
  updateRoom,
} from './actions';

// Type for our state
export interface IRoomState {
  loading: boolean;
  error: string | null;
  rooms: Array<IRoom>;
  currentRoom: IRoom | null;
}

// Initial state
const initialState: IRoomState = {
  loading: false,
  error: null,
  rooms: [],
  currentRoom: null,
};

// Room Slice
export const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadRooms.fulfilled, (state, action) => {
      const { rooms } = action.payload;
      state.rooms = rooms;
    });

    builder.addCase(applyRoom.fulfilled, (state, action) => {
      const { room } = action.payload;
      state.currentRoom = room;
    });

    builder.addCase(createRoom.fulfilled, (state, action) => {
      const { room } = action.payload;
      state.rooms = [room, ...state.rooms];
    });

    builder.addCase(updateRoom.fulfilled, (state, action) => {
      const { updatedRoom } = action.payload;
      state.rooms = state.rooms.map((room) =>
        room._id === updatedRoom._id ? updatedRoom : room
      );
    });

    builder.addCase(deleteRoom.fulfilled, (state, action) => {
      const { roomId } = action.payload;
      state.rooms = state.rooms.filter((room) => room._id !== roomId);
    });

    builder.addMatcher(
      isAnyOf(
        loadRooms.fulfilled,
        applyRoom.fulfilled,
        createRoom.fulfilled,
        updateRoom.fulfilled,
        deleteRoom.fulfilled
      ),
      (state) => {
        state.loading = false;
      }
    );

    builder.addMatcher(
      isAnyOf(
        loadRooms.pending,
        applyRoom.pending,
        createRoom.pending,
        updateRoom.pending,
        deleteRoom.pending
      ),
      (state) => {
        state.loading = true;
      }
    );

    builder.addMatcher(
      isAnyOf(
        loadRooms.rejected,
        applyRoom.rejected,
        createRoom.rejected,
        updateRoom.rejected,
        deleteRoom.rejected
      ),
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      }
    );
  },
});

export const selectRooms = (state: AppState) => state.room.rooms;

export default roomSlice.reducer;

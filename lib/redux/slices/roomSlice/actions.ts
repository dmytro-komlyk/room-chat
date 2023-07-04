import { roomServices } from '@/services';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ActionType } from './common.js';

const loadRooms = createAsyncThunk(
  ActionType.SET_ALL_ROOMS,
  async (filters: object, thunkApi) => {
    try {
      const rooms = await roomServices.getAllRooms(filters);
      return { rooms };
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

const applyRoom = createAsyncThunk(
  ActionType.SET_ROOM,
  async (id: string, thunkApi) => {
    try {
      const room = await roomServices.getRoom(id);
      return { room };
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

const createRoom = createAsyncThunk(
  ActionType.ADD_ROOM,
  async (
    data: { ownerId: string; title: string; description: string },
    thunkApi
  ) => {
    try {
      const { _id } = await roomServices.addRoom(data);
      const room = await roomServices.getRoom(_id);
      return { room };
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

const updateRoom = createAsyncThunk(
  ActionType.UPDATE_ROOM,
  async (data: { id: string; payload: object }, thunkApi) => {
    try {
      const { _id } = await roomServices.updateRoom(data);
      const updatedRoom = await roomServices.getRoom(_id);
      return { updatedRoom };
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

const deleteRoom = createAsyncThunk(
  ActionType.REMOVE_ROOM,
  async (roomId: string, thunkApi) => {
    try {
      const { deleted } = await roomServices.removeRoom(roomId);
      return { roomId: deleted };
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export { applyRoom, createRoom, deleteRoom, loadRooms, updateRoom };

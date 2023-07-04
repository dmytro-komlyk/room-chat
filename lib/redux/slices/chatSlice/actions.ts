import { chatServices } from '@/services';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ActionType } from './common';

const loadChats = createAsyncThunk(
  ActionType.SET_ALL_CHATS,
  async (filters: object, thunkApi) => {
    try {
      const chats = await chatServices.getAllChats(filters);
      return { chats };
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

const applyChat = createAsyncThunk(
  ActionType.SET_CHAT,
  async (id: string, thunkApi) => {
    try {
      const chat = await chatServices.getChat(id);
      return { chat };
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

const createChat = createAsyncThunk(
  ActionType.ADD_CHAT,
  async (data: { user: object }, thunkApi) => {
    try {
      const { _id } = await chatServices.addChat(data);
      const chat = await chatServices.getChat(_id);
      return { chat };
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

const updateChat = createAsyncThunk(
  ActionType.UPDATE_CHAT,
  async (data: { id: string; payload: object }, thunkApi) => {
    try {
      const { _id } = await chatServices.updateChat(data);
      const updatedChat = await chatServices.getChat(_id);
      return { updatedChat };
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

const deleteChat = createAsyncThunk(
  ActionType.REMOVE_CHAT,
  async (chatId: string, thunkApi) => {
    try {
      const { deleted } = await chatServices.removeChat(chatId);
      return { chatId: deleted };
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export { applyChat, createChat, deleteChat, loadChats, updateChat };

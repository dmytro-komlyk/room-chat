import { IChat } from '@/common/types';
import { createSlice, isAnyOf, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from '../../store';
import {
  applyChat,
  createChat,
  deleteChat,
  loadChats,
  updateChat,
} from './actions';

// Type for our state
export interface IChatState {
  loading: boolean;
  error: string | null;
  chats: Array<IChat>;
  currentChat: IChat | null;
}

// Initial state
const initialState: IChatState = {
  loading: false,
  error: null,
  chats: [],
  currentChat: null,
};

// Room Slice
export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadChats.fulfilled, (state, action) => {
      const { chats } = action.payload;
      state.chats = chats;
    });

    builder.addCase(applyChat.fulfilled, (state, action) => {
      const { chat } = action.payload;
      state.currentChat = chat;
    });

    builder.addCase(createChat.fulfilled, (state, action) => {
      const { chat } = action.payload;
      state.chats = [chat, ...state.chats];
    });

    builder.addCase(updateChat.fulfilled, (state, action) => {
      const { updatedChat } = action.payload;
      state.chats = state.chats.map((chat) =>
        chat._id === updatedChat._id ? updatedChat : chat
      );
    });

    builder.addCase(deleteChat.fulfilled, (state, action) => {
      const { chatId } = action.payload;
      state.chats = state.chats.filter((chat) => chat._id !== chatId);
    });

    builder.addMatcher(
      isAnyOf(
        loadChats.fulfilled,
        applyChat.fulfilled,
        createChat.fulfilled,
        updateChat.fulfilled,
        deleteChat.fulfilled
      ),
      (state) => {
        state.loading = false;
      }
    );

    builder.addMatcher(
      isAnyOf(
        loadChats.pending,
        applyChat.pending,
        createChat.pending,
        updateChat.pending,
        deleteChat.pending
      ),
      (state) => {
        state.loading = true;
      }
    );

    builder.addMatcher(
      isAnyOf(
        loadChats.rejected,
        applyChat.rejected,
        createChat.rejected,
        updateChat.rejected,
        deleteChat.rejected
      ),
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      }
    );
  },
});

export const selectChats = (state: AppState) => state.chat.chats;

export default chatSlice.reducer;

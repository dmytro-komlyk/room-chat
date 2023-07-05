import { IContact } from '@/common/types';
import { createSlice, isAnyOf, PayloadAction } from '@reduxjs/toolkit';
import {
  applyContact,
  createContact,
  deleteContact,
  loadContacts,
} from './actions';

// Type for our state
export interface IContactState {
  loading: boolean;
  error: string | null;
  contacts: Array<IContact>;
  currentContact: IContact | null;
}

// Initial state
const initialState: IContactState = {
  loading: false,
  error: null,
  contacts: [],
  currentContact: null,
};

// Room Slice
export const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadContacts.fulfilled, (state, action) => {
      const { contacts } = action.payload;
      state.contacts = contacts;
    });

    builder.addCase(applyContact.fulfilled, (state, action) => {
      const { contact } = action.payload;
      state.currentContact = contact;
    });

    builder.addCase(createContact.fulfilled, (state, action) => {
      const { contact } = action.payload;
      state.contacts = [contact, ...state.contacts];
    });

    builder.addCase(deleteContact.fulfilled, (state, action) => {
      const { contactId } = action.payload;
      state.contacts = state.contacts.filter(
        (contact) => contact._id !== contactId
      );
    });

    builder.addMatcher(
      isAnyOf(
        loadContacts.fulfilled,
        applyContact.fulfilled,
        createContact.fulfilled,
        deleteContact.fulfilled
      ),
      (state) => {
        state.loading = false;
      }
    );

    builder.addMatcher(
      isAnyOf(
        loadContacts.pending,
        applyContact.pending,
        createContact.pending,
        deleteContact.pending
      ),
      (state) => {
        state.loading = true;
      }
    );

    builder.addMatcher(
      isAnyOf(
        loadContacts.rejected,
        applyContact.rejected,
        createContact.rejected,
        deleteContact.rejected
      ),
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      }
    );
  },
});

// export const selectChats = (state: AppState) => state.chat.chats;

export default contactSlice.reducer;

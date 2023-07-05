import { contactServices } from '@/services';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ActionType } from './common';

const loadContacts = createAsyncThunk(
  ActionType.SET_ALL_CONTACTS,
  async (filters: object, thunkApi) => {
    try {
      const contacts = await contactServices.getAllContacts(filters);
      return { contacts };
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

const applyContact = createAsyncThunk(
  ActionType.SET_CONTACT,
  async (id: string, thunkApi) => {
    try {
      const contact = await contactServices.getContact(id);
      return { contact };
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

const createContact = createAsyncThunk(
  ActionType.ADD_CONTACT,
  async (data: { user: object }, thunkApi) => {
    try {
      const { _id } = await contactServices.addContact(data);
      const contact = await contactServices.getContact(_id);
      return { contact };
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

const deleteContact = createAsyncThunk(
  ActionType.REMOVE_CONTACT,
  async (contactId: string, thunkApi) => {
    try {
      const { deleted } = await contactServices.removeContact(contactId);
      return { contactId: deleted };
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export { applyContact, createContact, deleteContact, loadContacts };

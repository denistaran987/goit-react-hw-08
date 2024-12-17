import toast from 'react-hot-toast';
import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { addContact, deleteContact, editContact, fetchContacts } from './operations';
import { logout } from '../auth/operations';

const initialState = {
  items: [],
  editData: null,
  loading: false,
  error: null,
};

const slice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    setEditData: (state, action) => {
      state.editData = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.fulfilled, (state, { payload }) => {
        state.items = payload;
      })
      .addCase(addContact.fulfilled, (state, { payload }) => {
        state.items.push(payload);
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload.id);
      })
      .addCase(editContact.fulfilled, (state, action) => {
        const contact = state.items.find(item => item.id === action.payload.id);
        contact.name = action.payload.name;
        contact.number = action.payload.number;
      })
      .addCase(logout.fulfilled, () => initialState)
      .addMatcher(
        isAnyOf(fetchContacts.pending, addContact.pending, deleteContact.pending),
        state => {
          state.error = null;
          state.loading = true;
        }
      )
      .addMatcher(
        isAnyOf(fetchContacts.fulfilled, addContact.fulfilled, deleteContact.fulfilled),
        state => {
          state.loading = false;
        }
      )
      .addMatcher(
        isAnyOf(fetchContacts.rejected, addContact.rejected, deleteContact.rejected),
        state => {
          state.error = toast.error('Oops! Something went wrong. Please try again later.', {
            style: {
              backgroundColor: '#D924247F',
              color: '#fff',
            },
          });
          state.loading = false;
        }
      );
  },
});

export const { setEditData } = slice.actions;

export default slice.reducer;

import toast from 'react-hot-toast';
import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { addContact, deleteContact, fetchContacts } from './operations';
import { logout } from '../auth/operations';

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const slice = createSlice({
  name: 'contacts',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.fulfilled, (state, { payload }) => {
        state.items = payload;
      })
      .addCase(addContact.fulfilled, (state, { payload }) => {
        state.items.push(payload);
      })
      .addCase(deleteContact.fulfilled, (state, actions) => {
        state.items = state.items.filter(item => item.id !== actions.payload.id);
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

export default slice.reducer;

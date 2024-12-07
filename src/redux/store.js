import { configureStore } from '@reduxjs/toolkit';
import filtersReduser from './filtersSlice';
import contactsReducer from './contactsSlice';

export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    filters: filtersReduser,
  },
});

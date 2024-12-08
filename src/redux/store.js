import { configureStore } from '@reduxjs/toolkit';
import filtersReduser from './filters/slice';
import contactsReducer from './contacts/slice';
import registerReducer from './auth/slice';

export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    filters: filtersReduser,
    auth: registerReducer,
  },
});

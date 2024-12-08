import { createSlice } from '@reduxjs/toolkit';
import { login, register } from './operations';

const initialState = {
  user: {
    name: null,
    email: null,
  },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
};

export const slice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: builder => {
    builder.addCase(register.fulfilled, (state, action) => {
      state.user.name = action.payload.name;
      state.user.email = action.payload.email;
      state.user.password = action.payload.password;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.token = action.payload.token;
    });
  },
});

export default slice.reducer;

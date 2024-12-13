import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { login, logout, refreshUser, register } from './operations';

const initialState = {
  user: {
    name: null,
    email: null,
  },
  token: null,
  isLoading: false,
  isLoggedIn: false,
  isRefreshing: false,
};

export const slice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(login.pending, state => {
        state.isLoggedIn = false;
      })
      .addCase(logout.pending, state => {
        state.isLoading = true;
        state.isLoggedIn = true;
      })
      .addCase(logout.fulfilled, state => {
        state.user = initialState;
        state.isLoading = false;
        state.isLoggedIn = false;
      })
      .addCase(refreshUser.pending, state => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.rejected, state => {
        state.isRefreshing = false;
      })
      .addMatcher(isAnyOf(register.pending, login.pending), state => {
        state.isLoading = true;
        state.isLoggedIn = false;
      })
      .addMatcher(isAnyOf(register.fulfilled, login.fulfilled), (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addMatcher(isAnyOf(register.rejected, login.rejected, logout.rejected), state => {
        state.isLoading = false;
        state.isLoggedIn = false;
      });
  },
});

export default slice.reducer;

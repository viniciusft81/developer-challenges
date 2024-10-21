import { createSlice } from '@reduxjs/toolkit';
import { api } from '../services/api';

const authSlice = createSlice({
  name: 'user',
  initialState: {
    token: '',
    isLogged: false,
  },
  reducers: {
    changeUser: (state, { payload }) => {
      const apiResponse = api.post('/auth/login', {
        email: payload.email,
        password: payload.password,
      });
      console.log(apiResponse);

      return { ...state, isLogged: true, token: payload };
    },
    logout: (state) => {
      return { ...state, isLogged: false, token: '' };
    },
  },
});

export const { changeUser, logout } = authSlice.actions;
export const selectUser = (state: { user: any; }) => state.user;
export default authSlice.reducer;

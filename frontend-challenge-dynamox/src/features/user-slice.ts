import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { authClient, SignUpParams } from '../lib/auth/client';

export const loginUser = createAsyncThunk(
  '/auth/login',
  async (user: SignUpParams, { rejectWithValue }) => {
    const response = await authClient.signInWithPassword(user);
    
    if (response.error) {
      return rejectWithValue(response.error);
    }

    return { token: response.token };
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: '',
    isLogged: false,
    error: null as unknown,
  },
  reducers: {
    logout: (state) => {
      return { ...state, isLogged: false, token: '' };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLogged = true;
      state.token = action.payload.token ?? '';
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLogged = false;
      state.token = '';
      state.error = action.payload;
    });
  },
});

export const { logout } = authSlice.actions;
export const selectUser = (state: { user: any; }) => state.user;
export default authSlice.reducer;

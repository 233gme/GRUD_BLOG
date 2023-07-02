import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'shared/config/axios/axios';

export const fetchLogin = createAsyncThunk('auth/fetchLogin', async (params) => {
  const { data } = await axios.post('/auth/login', params);
  return data;
});

export const fetchLoginMe = createAsyncThunk('auth/fetchLoginMe', async (params) => {
  const { data } = await axios.get('/auth/me');
  return data;
});

export const fetchRegister = createAsyncThunk('auth/fetchRegister', async (params) => {
  const { data } = await axios.post('/auth/register', params);
  return data;
});

const initialState = {
  data: null,
  status: 'loading'
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
      state.status = 'loaded';
    }
  },
  extraReducers: {
    [fetchLogin.pending]: (state, action) => {
      state.status = 'loading';
      state.data = null;
    },
    [fetchLogin.fulfilled]: (state, action) => {
      state.status = 'loaded';
      state.data = action.payload;
    },
    [fetchLogin.rejected]: (state, action) => {
      state.status = 'error';
      state.data = null;
    },
    [fetchLoginMe.pending]: (state, action) => {
      state.status = 'loading';
      state.data = null;
    },
    [fetchLoginMe.fulfilled]: (state, action) => {
      state.status = 'loaded';
      state.data = action.payload;
    },
    [fetchLoginMe.rejected]: (state, action) => {
      state.status = 'error';
      state.data = null;
    },
    [fetchRegister.pending]: (state, action) => {
      state.status = 'loading';
      state.data = null;
    },
    [fetchRegister.fulfilled]: (state, action) => {
      state.status = 'loaded';
      state.data = action.payload;
    },
    [fetchRegister.rejected]: (state, action) => {
      state.status = 'error';
      state.data = null;
    },
  }
});

export const { logout } = authSlice.actions;

export const selectIsAuth = (state) => Boolean(state.auth.data);

export const authReducer = authSlice.reducer;

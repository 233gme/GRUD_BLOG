import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'shared/config/axios/axios';

export const fetchUserData = createAsyncThunk('auth/fetchUserData', async (params) => {
  const { data } = await axios.post('/auth/login', params);
  return data;
});

const initialState = {
  data: null,
  status: 'loading'
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: {
    [fetchUserData.pending]: (state, action) => {
      state.status = 'loading';
      state.data = null;
    },
    [fetchUserData.fulfilled]: (state, action) => {
      state.status = 'loaded';
      state.data = action.payload;
    },
    [fetchUserData.rejected]: (state, action) => {
      state.status = 'error';
      state.data = null;
    },
  }
});

export const authReducer = authSlice.reducer;

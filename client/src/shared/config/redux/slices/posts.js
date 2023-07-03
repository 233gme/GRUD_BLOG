import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'shared/config/axios/axios';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const { data } = await axios.get('/posts');
  return data;
});

export const fetchNewPosts = createAsyncThunk('posts/fetchNewPosts', async () => {
  const { data } = await axios.get('/posts/new');
  return data;
});

export const fetchMostViewedPosts = createAsyncThunk('posts/fetchMostViewedPosts', async () => {
  const { data } = await axios.get('/posts/views');
  return data;
});

export const fetchTags = createAsyncThunk('posts/fetchTags', async () => {
  const { data } = await axios.get('/posts/tags');
  return data;
});

export const fetchRemovePost = createAsyncThunk('posts/fetchRemovePost', async (id) => {
  await axios.delete(`/posts/${id}`);
});

const initialState = {
  posts: {
    items: [],
    status: 'loading'
  },
  tags: {
    items: [],
    status: 'loading'
  },
  sort: {
    value: 'all',
    status: 'loading'
  },
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducer: {},
  extraReducers: {
    // get posts
    [fetchPosts.pending]: (state, action) => {
      state.posts.items = [];
      state.posts.status = 'loading';
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.posts.items = action.payload;
      state.sort.value = 'all';
      state.posts.status = 'loaded';
    },
    [fetchPosts.rejected]: (state, action) => {
      state.posts.items = [];
      state.posts.status = 'error';
    },
    // get new posts
    [fetchNewPosts.pending]: (state, action) => {
      state.posts.items = [];
      state.posts.status = 'loading';
    },
    [fetchNewPosts.fulfilled]: (state, action) => {
      state.posts.items = action.payload;
      state.sort.value = 'new';
      state.posts.status = 'loaded';
    },
    [fetchNewPosts.rejected]: (state, action) => {
      state.posts.items = [];
      state.posts.status = 'error';
    },
    // get most viewed posts
    [fetchMostViewedPosts.pending]: (state, action) => {
      state.posts.items = [];
      state.posts.status = 'loading';
    },
    [fetchMostViewedPosts.fulfilled]: (state, action) => {
      state.posts.items = action.payload;
      state.sort.value = 'views';
      state.posts.status = 'loaded';
    },
    [fetchMostViewedPosts.rejected]: (state, action) => {
      state.posts.items = [];
      state.posts.status = 'error';
    },
    //get tags
    [fetchTags.pending]: (state, action) => {
      state.tags.items = [];
      state.tags.status = 'loading';
    },
    [fetchTags.fulfilled]: (state, action) => {
      state.tags.items = action.payload;
      state.tags.status = 'loaded';
    },
    [fetchTags.rejected]: (state, action) => {
      state.tags.items = [];
      state.tags.status = 'error';
    },
    //remove post
    [fetchRemovePost.pending]: (state, action) => {
      state.posts.items = state.posts.items.filter(post => post._id !== action.meta.arg);
    },
    [fetchRemovePost.rejected]: (state, action) => {
      state.posts.status = 'error';
    }
  }
});

export const postsReducer = postsSlice.reducer;

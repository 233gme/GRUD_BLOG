import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'shared/config/axios/axios';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (arg) => {
  const url = arg ? `/posts?${arg}` : '/posts';
  const { data } = await axios.get(url);
  return data;
});

export const fetchSortedPosts = createAsyncThunk('posts/fetchSortedPosts', async (sortby) => {
  const { data } = await axios.get(`/posts/sort/${sortby}`);
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
  page: {
    total: null,
    current: null,
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
      state.posts.items = action.payload.posts;
      state.page.current = action.payload.currentPage;
      state.page.total = action.payload.totalPages;
      state.sort.value = 'all';
      state.posts.status = 'loaded';
    },
    [fetchPosts.rejected]: (state, action) => {
      state.posts.items = [];
      state.posts.status = 'error';
    },
    // get new posts
    [fetchSortedPosts.pending]: (state, action) => {
      state.posts.items = [];
      state.posts.status = 'loading';
    },
    [fetchSortedPosts.fulfilled]: (state, action) => {
      state.posts.items = action.payload;
      state.sort.value = action.meta.arg;
      state.posts.status = 'loaded';
    },
    [fetchSortedPosts.rejected]: (state, action) => {
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

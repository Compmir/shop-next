import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const initStateGetCategories = {
  getCategories: { offset: 4, page: 1, pages: 0, data: null, loading: false, error: null },
};

export const getCategories = createAsyncThunk('category/getCategories', async (data = {}, { getState }) => {
  return axios.get(`api/categories/`);
});

export const reducerGetCategories = {
  [getCategories.pending]: (state) => {
    state.getCategories.loading = true;
  },
  [getCategories.fulfilled]: (state, action) => {
    state.getCategories.loading = false;

    state.getCategories.data = action.payload.data;
  },
  [getCategories.rejected]: (state, action) => {
    console.log(action.payload);
    state.getCategories.error = action.payload;
    state.getCategories.loading = false;
  },
};

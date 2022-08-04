import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const initStateCreateCategory = {
  createCategory: { data: null, loading: false, error: null },
};

export const createCategory = createAsyncThunk('category/createCategory', async (data) => {
  return axios.post(`api/category`, data);
});

export const reducerCreateCategory = {
  [createCategory.pending]: (state) => {
    state.createCategory.loading = true;
  },
  [createCategory.fulfilled]: (state, action) => {
    state.createCategory.loading = false;
    state.createCategory.data = action.payload.data;
  },
  [createCategory.rejected]: (state) => {
    state.createCategory.loading = false;
  },
};

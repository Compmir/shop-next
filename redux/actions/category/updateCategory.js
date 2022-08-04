import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const initStateUpdateCategory = {
  updateCategory: { data: null, loading: false, error: null },
};

export const updateCategory = createAsyncThunk('category/updateCategory', async (data) => {
  return axios.patch(`api/category`, data);
});

export const reducerUpdateCategory = {
  [updateCategory.pending]: (state) => {
    state.updateCategory.loading = true;
  },
  [updateCategory.fulfilled]: (state, action) => {
    state.updateCategory.loading = false;
    state.updateCategory.data = action.payload.data;
  },
  [updateCategory.rejected]: (state) => {
    state.updateCategory.loading = false;
  },
};

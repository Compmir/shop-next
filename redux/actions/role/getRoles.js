import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const initStateGetRoles = {
  getRoles: { offset: 4, page: 1, pages: 0, data: null, loading: false, error: null },
};

export const getRoles = createAsyncThunk('role/getRoles', async (data = {}, { getState }) => {
  const {
    role: {
      getRoles: { offset, page },
    },
  } = getState();
  return axios.get(`api/roles/`, { params: { offset, page, ...data } });
});

export const reducerGetRoles = {
  [getRoles.pending]: (state) => {
    state.getRoles.loading = true;
  },
  [getRoles.fulfilled]: (state, action) => {
    state.getRoles.loading = false;

    state.getRoles.data = action.payload.data.roles;
    state.getRoles.pages = action.payload.data.pages;
    state.getRoles.page = parseInt(action.payload.data.page);
  },
  [getRoles.rejected]: (state, action) => {
    state.getRoles.error = action.payload;
    state.getRoles.loading = false;
  },
};

import { createSlice } from '@reduxjs/toolkit';

export const initialState = { modalUser: false, modalFirm: false, modalRole: false, modalCategory: false, modalCreateCategory: false };

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setShowModalUser: (state, { payload }) => {
      state.modalUser = payload;
    },
    setShowModalCategory: (state, { payload }) => {
      state.modalCategory = payload;
    },
    setShowCreateModalCategory: (state, { payload }) => {
      state.modalCreateCategory = payload;
    },
    setShowModalFirm: (state, { payload }) => {
      state.modalFirm = payload;
    },
    setShowModalRole: (state, { payload }) => {
      state.modalRole = payload;
    },
  },
});
export const { setShowModalUser, setShowModalFirm, setShowModalRole, setShowModalCategory, setShowCreateModalCategory } = appSlice.actions;
export const appReducer = appSlice.reducer;

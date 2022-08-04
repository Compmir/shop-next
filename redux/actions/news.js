import { createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
import { PrismaClient } from '@prisma/client';

export const initStateGet = {
			  offset: 4, page: 1, pages: 0, data: null, loading: false, error: null 

	}
 /*    getNews: { 
	() => {
 
   return 'test'

  
};*/

export const getNews = createAsyncThunk('news/getNews', async (data = {}, { getState }) => {
  /* const {
    user: {
      getUsers: { offset, page },
    },
  } = getState(); */
  const prisma = new PrismaClient()

   let news = await prisma.news.findMany({
			
	}) 
	news=JSON.parse(JSON.stringify(news)) // <== here is a solution
	
	return 'test'
 // return axios.get(`api/firms/`, { params: { offset, page, ...data } });
});

/* export const reducerGet = {
  [getFirms.pending]: (state) => {
    state.getFirms.loading = true;
  },
  [getFirms.fulfilled]: (state, action) => {
    state.getFirms.loading = false;

    state.getFirms.data = action.payload.data.users;
    state.getFirms.pages = action.payload.data.pages;
    state.getFirms.page = parseInt(action.payload.data.page);
  },
  [getFirms.rejected]: (state) => {
    state.getFirms.loading = false;
  },
};
 */
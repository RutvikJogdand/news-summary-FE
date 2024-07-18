import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  articles: [],
  status: 'idle',
  error: null,
  page: 1,
  totalPages: 1,
  query: '',
  from: '',
  to: '',
  summaryStatus: 'idle', 
  summaryError: null,
};

export const fetchNews = createAsyncThunk('news/fetchNews', async ({ query, from, to, page }) => {
  const response = await axios.get('http://localhost:5000/news', {
    params: {
      query,
      from,
      to,
      page,
      pageSize: 5,
    },
  });
  return response.data;
});

export const fetchSummary = createAsyncThunk('news/fetchSummary', async (article) => {
  const response = await axios.post('http://localhost:5000/summarize', { article });
  return { ...article, summary: response.data.summary };
});

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    setQuery(state, action) {
      state.query = action.payload;
    },
    setFromDate(state, action) {
      state.from = action.payload;
    },
    setToDate(state, action) {
      state.to = action.payload;
    },
    setPage(state, action) {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.articles = action.payload.articles.filter(item => item.title !== "[Removed]");
        state.totalPages = Math.ceil(action.payload.totalResults / 5);
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchSummary.pending, (state) => {
        state.summaryStatus = 'loading';
      })
      .addCase(fetchSummary.fulfilled, (state, action) => {
        state.summaryStatus = 'succeeded';
        const index = state.articles.findIndex(article => article.title === action.payload.title);
        if (index !== -1) {
          state.articles[index].summary = action.payload.summary;
        }
      })
      .addCase(fetchSummary.rejected, (state, action) => {
        state.summaryStatus = 'failed';
        state.summaryError = action.error.message;
      });
  },
});

export const { setQuery, setFromDate, setToDate, setPage } = newsSlice.actions;

export default newsSlice.reducer;

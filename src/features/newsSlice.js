import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  news: [],
  loading: false,
  error: null,
  oneNews: null,
  loadingComments: false,
};

export const getOneNews = createAsyncThunk("news/new", async (id, thunkAPI) => {
  try {
    const response = await fetch(
      `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
    );
    const newsData = await response.json();

    const comments = [];
    if (newsData.kids) {
      await Promise.all(
        newsData.kids.map(async (commentId) => {
          const commentResponse = await fetch(
            `https://hacker-news.firebaseio.com/v0/item/${commentId}.json?print=pretty`
          );
          const commentData = await commentResponse.json();
          comments.push(commentData);
        })
      );
    }
    return { news: newsData, comments: comments };
  } catch (error) {
    throw error;
  }
});

export const getNews = createAsyncThunk("news/getNews", async (_, thunkAPI) => {
  try {
    const fetchingData = await fetch(
      "https://hacker-news.firebaseio.com/v0/askstories.json"
    );
    const itemIds = await fetchingData.json();
    const limitedItemIds = itemIds.slice(0, 100);
    const promises = limitedItemIds.map(async (id) => {
      const response = await fetch(
        `https://hacker-news.firebaseio.com/v0/item/${id}.json`
      );
      return response.json();
    });

    const results = await Promise.all(promises);

    const list = results.map((result) => ({
      id: result.id,
      title: result.title,
      score: result.score,
      url: result.url,
      author: result.by,
      time: new Date(result.time * 1000).toLocaleString(),
      kids: result.kids,
    }));

    return thunkAPI.fulfillWithValue(list);
  } catch (error) {
    throw error;
  }
});

const newsSlice = createSlice({
  name: "News",
  initialState,
  reducers: {},
  extraReducers: (build) => {
    build
      .addCase(getNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getNews.fulfilled, (state, action) => {
        state.news = action.payload;
        state.loading = false;
      })
      .addCase(getNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getOneNews.pending, (state) => {
        state.loadingComments = true;
        state.error = null;
      })
      .addCase(getOneNews.fulfilled, (state, action) => {
        state.oneNews = action.payload;
        state.loadingComments = false;
      })
      .addCase(getOneNews.rejected, (state, action) => {
        state.loadingComments = false;
        state.error = action.error.message;
      })
  },
});

export default newsSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getNestedComments = createAsyncThunk(
  'nestedComments/getNestedComments',
  async (kidsId, thunkAPI) => {
    try {
      const comments = []
      await Promise.all(
        kidsId.map(async (commentId) => {
          const commentResponse = await fetch(
            `https://hacker-news.firebaseio.com/v0/item/${commentId}.json?print=pretty`
          );
          const commentData = await commentResponse.json();
          comments.push(commentData);
        })
      );
      return thunkAPI.fulfillWithValue(comments);
    } catch (error) {
      throw error;
    }
  }
);

export const nestedCommentsSlice = createSlice({
  name: 'nestedComments',
  initialState: {
    nestedComments: [],
  },
  reducers: {},
  extraReducers: (build) => {
    build
      .addCase(getNestedComments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getNestedComments.fulfilled, (state, action) => {
        state.nestedComments = action.payload;
        state.loading = false;
      })
    }
});

export const { setNestedComments } = nestedCommentsSlice.actions;
export default nestedCommentsSlice.reducer;

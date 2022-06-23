import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loadCommentsForPostId = createAsyncThunk(
  'comments/loadCommentsForPostId',
  async (comments) => {
    const {postId, subreddit} = comments;
    const response = await fetch(`https://www.reddit.com/r/${subreddit}/comments/${postId}.json`);
    const json = await response.json();
    return json;
  }
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    byPostId: {

    },
    loading: false,
    error: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadCommentsForPostId.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(loadCommentsForPostId.fulfilled, (state, action) => {
        const postId = action.payload[0].data.children[0].data.id;
        const comments = action.payload[1].data.children;
        state.byPostId[postId] = [];
        comments.forEach(comment => {
          state.byPostId[postId].push(comment.data);
        });
        state.loading = false;
        state.error = false;
      })
      .addCase(loadCommentsForPostId.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      })
  },
});

export const selectComments = (state) => state.comments.byPostId;
export const loading = (state) => state.comments.loading;

export default commentsSlice.reducer;
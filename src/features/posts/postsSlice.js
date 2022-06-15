import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loadAllPosts = createAsyncThunk(
  'posts/loadAllPosts',
  async (reddit) => {
    const {subreddit, limit} = reddit;
    const data = await fetch(`https://www.reddit.com/r/${subreddit}/new.json?limit=${limit}&t=month`);
    const json = await data.json();
    return json.data;
  }
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    allPosts: {
      // postId: {}
    },
    bySubreddit: {
      // 80smusic: []
    },
    loading: false,
    error: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadAllPosts.pending, (state) => {
        state.error = false;
        state.loading = true;
      })
      .addCase(loadAllPosts.fulfilled, (state, action) => {
        const { subreddit } = action.meta.arg;
        state.bySubreddit[subreddit] = [];
        action.payload.children.forEach(post => {
          state.bySubreddit[subreddit].push(post.data);
          // state.posts[subreddit][post.data.id] = post.data;
        });

        state.loading = false;
        state.error = false;
      })
      .addCase(loadAllPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      })
  },
});

export const selectPosts = (state, subreddit) => {
  return state.posts.allPosts;
};
export const selectFeaturedPosts = (state, subreddit) => {
  const featuredPosts = state.posts.bySubreddit[subreddit];

  return featuredPosts;

  // return Object.keys(featuredPosts) //get the keys out
  //   .sort() //this will ensure consistent ordering of what you will get back. If you want something in non-aphabetical order, you will need to supply a custom sorting function
  //   .slice(0, 3) //get the first N
  //   .reduce(function(memo, current) { //generate a new object out of them
  //     memo[current] = featuredPosts[current]
  //     return memo;
  // }, {});
};
export const loading = (state) => state.posts.loading;

export default postsSlice.reducer;
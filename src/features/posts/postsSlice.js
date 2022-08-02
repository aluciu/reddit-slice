import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { appSubreddits } from "../../App";

export const loadAllPosts = createAsyncThunk(
  'posts/loadAllPosts',
  async (reddit) => {
    const { subreddit, limit, cursor } = reddit;
    let url = `https://www.reddit.com/r/${subreddit}/new.json?limit=${limit}&t=month`;
    if (cursor) {
      url = url + `&after=${cursor}`;
    }
    const data = await fetch(url);
    const json = await data.json();
    return json.data;
  }
);

export const loadSearchResults = createAsyncThunk(
  'search/loadSearchResults',
  async (searchTerm) => {
    const escSearchTerm = searchTerm.replace(/ /g, "+");
    // const data = await fetch(`https://www.reddit.com/r/videos/search.json?q=${escSearchTerm}&restrict_sr=on&include_over_18=on&sort=relevance&t=all&limit=2`);
    const arrayOfPromises = appSubreddits.map(subreddit => {
      return fetch(`https://www.reddit.com/r/${subreddit}/search.json?q=${escSearchTerm}&restrict_sr=on&include_over_18=on&sort=relevance&t=all&limit=10`)
        .then(response => response.json());
    });

    const promisesWithErrorHandler = arrayOfPromises.map(promise => promise.catch(error => error));

    return Promise.all(promisesWithErrorHandler)
      .then(result => result)
      .catch(error => console.log(error));
  }
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    byId: {
      // postId: {}
    },
    bySubreddit: {
      // 80smusic: []
    },
    cursor: {
      // 80smusic: "t3_wdb9ib"
    },
    searchBySubreddit: {
      // 80smusic: []
    },
    loading: false,
    error: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadAllPosts.pending, (state) => {
      state.error = false;
      state.loading = true;
    })
    builder.addCase(loadAllPosts.fulfilled, (state, action) => {
      const { subreddit } = action.meta.arg;
      state.bySubreddit[subreddit] = [];
      action.payload.children.forEach(post => {
        state.bySubreddit[subreddit].push(post.data);
        state.byId[post.data.id] = post.data;
      });
      state.cursor[subreddit] = action.payload.after;

      state.loading = false;
      state.error = false;
    })
    builder.addCase(loadAllPosts.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
    })
    builder.addCase(loadSearchResults.pending, (state) => {
      state.error = false;
      state.loading = true;
    })
    builder.addCase(loadSearchResults.fulfilled, (state, action) => {
      appSubreddits.forEach((subreddit, index) => {
        state.searchBySubreddit[subreddit] = [];
        state.searchBySubreddit[subreddit].push(...action.payload[index].data.children);
      });
      action.payload.forEach(subreddit => {
        subreddit.data.children.forEach((post) => {
          state.byId[post.data.id] = post.data;
        });
      });

      state.loading = false;
      state.error = false;
    })
    builder.addCase(loadSearchResults.rejected, (state) => {
      state.loading = false;
      state.error = true;
    })
  },
});

export const selectPostById = (state, postId) => {
  return state.posts.byId[postId];
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

export const selectCursor = (state, subreddit) => {
  const cursorBySubreddit = state.posts.cursor[subreddit];

  return cursorBySubreddit;
}

export const selectSearchResults = (state) => state.posts.searchBySubreddit;

export const loading = (state) => state.posts.loading;

export default postsSlice.reducer;
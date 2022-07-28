import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { appSubreddits } from "../../App";
// https://www.reddit.com/r/videos/search.json?q=potatoes+dog&restrict_sr=on&include_over_18=on&sort=relevance&t=all

export const searchSlice = createSlice({
  name: 'search',
  initialState: {
    bySubreddit: {
      // 80smusic: []
    },
    searchTerm: '',
    loading: false,
    error: false,
  },
  reducers: {
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadSearchResults.pending, (state) => {
        console.log('loading');
        state.error = false;
        state.loading = true;
      })
      .addCase(loadSearchResults.fulfilled, (state, action) => {
        console.log(action.payload);
        appSubreddits.forEach((subreddit, index) => {
          state.bySubreddit[subreddit] = [];
          state.bySubreddit[subreddit].push(...action.payload[index].data.children);
        });
        state.loading = false;
        state.error = false;
      })
      .addCase(loadSearchResults.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
  },
});

export const loadSearchResults = createAsyncThunk(
  'search/loadSearchResults',
  async (searchTerm) => {
    const escSearchTerm = searchTerm.replace(/ /g,"+");
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

export default searchSlice.reducer;
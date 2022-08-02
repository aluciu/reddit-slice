import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { PostPreview } from "../../components/PostPreview/PostPreview";
import { useDispatch, useSelector } from 'react-redux';
import { loadSearchResults, selectSearchResults, loading } from "../posts/postsSlice";
import styles from "./Search.module.css";
import PostLoading from '../../components/PostPreview/PostLoading';
import { appSubreddits } from "../../App";

const Search = () => {
  const { search } = useLocation();
  const dispatch = useDispatch();
  const posts = useSelector(state => selectSearchResults(state));
  const isLoading = useSelector(loading);
  const searchTerm = useSelector((state) => state.search.searchTerm);


  useEffect(() => {
    dispatch(loadSearchResults(searchTerm));
  }, [dispatch, searchTerm]);

  if (
    posts // 👈 null and undefined check
    && Object.keys(posts).length === 0
    && Object.getPrototypeOf(posts) === Object.prototype
  ) {
    let componentsArray = [];
    for (let i=0; i < 12; i++) {
      componentsArray.push(<PostLoading key={`loader-${i}`} />);
    }

    return (
      <div>
      Search {searchTerm}
      <div className={styles.grid}>
        {componentsArray}
      </div>
    </div>
    );
  };

  // if (isLoading && posts.length === 0) return <div>loading 2</div>;

  const hasResults = (subreddit, posts) => {
    if (posts[subreddit].length > 0) return true;
  }

  if (!isLoading) {

  }

      // if no results
      // display no results

  return (
    <div>
      Search {searchTerm}

      {appSubreddits.map(subreddit => {
        if (posts[subreddit].length > 0) {
          return (
            <SearchResults
              key={subreddit}
              subreddit={subreddit}
              posts={posts[subreddit]}
            />
          );
        }
        return null;
      })}

    </div>
  );
};

const SearchResults = ({subreddit, posts}) => {
  return (

      <>
        {subreddit}
        <div className={styles.grid}>
          {posts.map((post) => (
            <PostPreview
              key={post.data.id}
              post={post.data}
            />
          ))}
        </div>
      </>

  );
}

export default Search;
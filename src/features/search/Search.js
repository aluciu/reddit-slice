import React, { useEffect } from "react";
import { PostPreview } from "../../components/PostPreview/PostPreview";
import { useDispatch, useSelector } from 'react-redux';
import { loadSearchResults, selectSearchResults } from "../posts/postsSlice";
import styles from "./Search.module.css";
import PostLoading from '../../components/PostPreview/PostLoading';
import { appSubreddits } from "../../App";

const Search = () => {
  const dispatch = useDispatch();
  const posts = useSelector(state => selectSearchResults(state));
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
    for (let i = 0; i < 12; i++) {
      componentsArray.push(<PostLoading key={`loader-${i}`} />);
    }

    return (
      <div className={styles.container}>
        <h2 className={styles.pageTitle}>Search <em>{searchTerm}</em></h2>
        <div className={styles.grid}>
          {componentsArray}
        </div>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.pageTitle}>Search <em>{searchTerm}</em></h2>

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

const SearchResults = ({ subreddit, posts }) => {
  return (
    <div className={styles.sectionContainer}>
      <h3 className={styles.sectionTitle}><span>//</span> {subreddit}</h3>
      <div className={styles.grid}>
        {posts.map((post) => (
          <PostPreview
            key={post.data.id}
            post={post.data}
          />
        ))}
      </div>
    </div>

  );
}

export default Search;
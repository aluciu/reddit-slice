import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PostPreview } from "../../components/PostPreview/PostPreview";
import { loadAllPosts, selectPosts, selectFeaturedPosts, loading } from "./postsSlice";
import styles from "./Featured.module.css";

const Featured = ({subreddit}) => {
  const dispatch = useDispatch();
  // const posts = useSelector(selectPosts, '80smusic');
  const posts = useSelector(state => selectFeaturedPosts(state, subreddit));
  const loadingPosts = useSelector(loading);

  useEffect(() => {
    dispatch(loadAllPosts({subreddit: subreddit, limit: 10}));
  }, [dispatch, subreddit]);

  if (!posts) return null;
  if (loadingPosts || posts.length === 0) return <div>loading posts</div>;




  return (
    <div className={styles.featured}>
      <h2>Featured {subreddit}</h2>
      <div className={styles.posts}>
        {posts.slice(0, 3).map((post) => (
            <PostPreview
              key={post.id}
              post={post}
            />
        ))}
      </div>
    </div>
  );
};

export default Featured;
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PostPreview } from "../../components/PostPreview/PostPreview";
import { loadAllPosts, selectPosts, selectFeaturedPosts, loading } from "./postsSlice";
import styles from "./Posts.module.css";

const Posts = () => {
  const dispatch = useDispatch();
  const loadingPosts = useSelector(loading);
  let { name } = useParams();
  const posts = useSelector(state => selectFeaturedPosts(state, name));

  useEffect(() => {
    dispatch(loadAllPosts({subreddit: name, limit: 10}));
  }, [dispatch, name]);

  if (!posts) return null;
  if (loadingPosts || posts.length === 0) return <div>loading posts</div>;

  return (
    <div>
      Posts {name}
      <div className={styles.grid}>
        {posts.map((post) => (
          <PostPreview
            key={post.id}
            post={post}
          />
        ))}
      </div>
    </div>
  );
};

export default Posts;
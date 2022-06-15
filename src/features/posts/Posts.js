import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PostPreview } from "../../components/PostPreview/PostPreview";
import { loadAllPosts, selectPosts, selectFeaturedPosts, loading } from "./postsSlice";
import styles from "./Posts.module.css";

const Posts = () => {
  const dispatch = useDispatch();
  // const posts = useSelector(selectPosts);
  let { name } = useParams();
  const posts = useSelector(state => selectFeaturedPosts(state, name));
  console.log('Posts >>>', posts);

  useEffect(() => {
    dispatch(loadAllPosts({subreddit: name, limit: 10}));
  }, [dispatch]);

  // if (loadingPosts) return <div>loading posts</div>;
  // if (!posts) return null;

  return (
    <div>
      Posts {name}
      <div className={styles.grid}>
      {posts.map((post) => (
        <PostPreview
          post={post}
        />
      ))}
      </div>
      {/* {Object.values(posts).map((post) => (
        <PostPreview
          post={post}
        />
      ))} */}
    </div>
  );
};

export default Posts;
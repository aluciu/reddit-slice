import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PostPreview } from "../../components/PostPreview/PostPreview";
import { loadAllPosts, selectFeaturedPosts, loading } from "./postsSlice";
import styles from "./Posts.module.css";
import PostLoading from '../../components/PostPreview/PostLoading';

const Posts = () => {
  const dispatch = useDispatch();
  const loadingPosts = useSelector(loading);
  let { name } = useParams();
  const posts = useSelector(state => selectFeaturedPosts(state, name));

  useEffect(() => {
    dispatch(loadAllPosts({subreddit: name, limit: 12}));
  }, [dispatch, name]);

  if (!posts) {
    return (
      <div>
        Posts {name}
        <div className={styles.grid}>
          {Array(12).fill(<PostLoading />)}
        </div>
      </div>
    );
  }
  if (loadingPosts && posts.length === 0) return <div>loading 2</div>;

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
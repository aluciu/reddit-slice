import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { PostPreview } from "../../components/PostPreview/PostPreview";
import { loadAllPosts, selectFeaturedPosts, loading } from "./postsSlice";
import styles from "./Featured.module.css";
import PostLoading from '../../components/PostPreview/PostLoading';
import ROUTES from "../../app/routes";

const Featured = ({ subreddit }) => {
  const dispatch = useDispatch();
  const posts = useSelector(state => selectFeaturedPosts(state, subreddit));
  const loadingPosts = useSelector(loading);

  useEffect(() => {
    dispatch(loadAllPosts({ subreddit: subreddit, limit: 10 }));
  }, [subreddit, dispatch]);

  if (!posts) {
    let componentsArray = [];
    for (let i = 0; i < 3; i++) {
      componentsArray.push(<PostLoading key={`loader-${i}`} />);
    }
    return (
      <div className={styles.featured}>
        <h2>Featured {subreddit}</h2>
        <div className={styles.posts}>
          {componentsArray}
        </div>
      </div>
    );
  };
  if (loadingPosts && posts.length === 0) return <div>loading posts 2</div>;




  return (
    <div className={styles.featured}>
      <h2 className={styles.title}><Link to={ROUTES.subreddit(subreddit)}>{subreddit} &raquo;</Link></h2>
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
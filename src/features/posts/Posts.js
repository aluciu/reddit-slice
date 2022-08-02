import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PostPreview } from "../../components/PostPreview/PostPreview";
import { loadAllPosts, selectFeaturedPosts, selectCursor, loading } from "./postsSlice";
import styles from "./Posts.module.css";
import PostLoading from '../../components/PostPreview/PostLoading';

const Posts = () => {
  // const firstRenderRef = useRef(true);
  const dispatch = useDispatch();
  const loadingPosts = useSelector(loading);
  let { name } = useParams();
  const posts = useSelector(state => selectFeaturedPosts(state, name));
  const cursor = useSelector(state => selectCursor(state, name));

  useEffect(() => {
    // if(firstRenderRef.current){
    //   firstRenderRef.current = false;
    //   return;
    // }
    // console.log("rendered", name);
    dispatch(loadAllPosts({subreddit: name, limit: 12}));
  }, [name, dispatch]);

  const onLoadMore = () => {
    dispatch(loadAllPosts({subreddit: name, limit: 12, cursor: cursor}));
  }

  console.log('render', posts);

  if (!posts) {
    let componentsArray = [];
    for (let i=0; i < 3; i++) {
      componentsArray.push(<PostLoading key={`loader-${i}`} />);
    }
    return (
      <div>
        Posts {name}
        <div className={styles.grid}>
          {componentsArray}
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

      <button onClick={onLoadMore}>Load More</button>
    </div>
  );
};

export default Posts;
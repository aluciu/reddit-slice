import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommentsList from "../../components/CommentsList/CommentsList";
import { loadCommentsForPostId, selectComments, loading } from "./commentsSlice";
import { selectPostById } from "../posts/postsSlice";
import VideoDisplay from "../../components/VideoDisplay/VideoDisplay";
import styles from "./Comments.module.css";
import { Link, useLocation, useHistory } from "react-router-dom";

const Comments = ({ postId, subreddit }) => {
  const dispatch = useDispatch();
  const post = useSelector((state) => selectPostById(state, postId));
  const comments = useSelector(selectComments);
  const loadingComments = useSelector(loading);
  const location = useLocation();
  let history = useHistory();

  useEffect(() => {
    dispatch(loadCommentsForPostId({postId: postId, subreddit: subreddit}));
  }, [dispatch, postId, subreddit]);

  const escFunction = useCallback((event) => {
    if (event.key === "Escape") {
      history.goBack();
    }
  }, [history]);

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);

    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, [escFunction]);

  if (!comments) return null;
  if (loadingComments) return <div>loading comments</div>;

  const postComments = comments[postId];
  if (!postComments) return null;

  return (
    <div className={styles.modaloverlay}>
      <div className={styles.modal}>
        <div className={styles.top}>
          <Link to={location.pathname} className={styles.close}>
            Close
          </Link>
        </div>
        <VideoDisplay post={post} />
        <CommentsList comments={postComments} />
      </div>
    </div>
  );
}

export default Comments;
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommentsList from "../../components/CommentsList/CommentsList";
import { loadCommentsForPostId, selectComments, loading } from "./commentsSlice";
import { selectPostById } from "../posts/postsSlice";
import VideoDisplay from "../../components/VideoDisplay/VideoDisplay";
import styles from "./Comments.module.css";

const Comments = ({ postId, subreddit }) => {
  const dispatch = useDispatch();
  const post = useSelector((state) => selectPostById(state, postId));
  const comments = useSelector(selectComments);
  const loadingComments = useSelector(loading);

  useEffect(() => {
    dispatch(loadCommentsForPostId({postId: postId, subreddit: subreddit}));
  }, [dispatch, postId, subreddit]);

  if (!comments) return null;
  if (loadingComments) return <div>loading comments</div>;

  const postComments = comments[postId];
  if (!postComments) return null;

  return (
    <div className={styles.modaloverlay}>
      <div className={styles.modal}>
        <VideoDisplay post={post} />
        <CommentsList comments={postComments} />
      </div>
    </div>
  );
}

export default Comments;
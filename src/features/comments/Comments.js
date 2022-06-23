import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommentsList from "../../components/CommentsList/CommentsList";
import { loadCommentsForPostId, selectComments, loading } from "./commentsSlice";

const Comments = ({ postId, subreddit }) => {
  const dispatch = useDispatch();
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
    <div>
      <CommentsList comments={postComments} />
    </div>
  );
}

export default Comments;
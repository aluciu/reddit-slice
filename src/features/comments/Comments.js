import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadCommentsForPostId, selectComments, loading } from "./commentsSlice";

const Comments = () => {
  const dispatch = useDispatch();
  const comments = useSelector(selectComments);
  const loadingComments = useSelector(loading);

  useEffect(() => {
    dispatch(loadCommentsForPostId('v0nxfv'));
  }, [dispatch]);

  if (loadingComments) return <div>loading comments</div>;
  // if (!comments) return null;
  if (Object.keys(comments).length === 0) return null;

  console.log('Comments >>>', comments);

  return (
    <div>
      <h2>Comments</h2>
      <ul>
      {Object.values(comments['v0nxfv']).map((comment) => (
        <li>
          <p>{comment.body}</p>
        </li>
      ))}
      </ul>
    </div>
  );
}

export default Comments;
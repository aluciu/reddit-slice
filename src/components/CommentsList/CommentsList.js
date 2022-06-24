import React from "react";

const CommentsList = ({ comments, post }) => {
  if (comments.length === 0) {
    return (
      <div>No comments here</div>
    );
  }

  return (
    <div>
      <h2>Comments</h2>
      <ul>
      {comments.map((comment) => (
        <li key={comment.id}>
          <p>{comment.author}</p>
          <p>{comment.body}</p>
        </li>
      ))}
      </ul>
    </div>
  );
}

export default CommentsList;
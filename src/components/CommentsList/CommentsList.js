import React from "react";
import { cleanHTML } from "../../helpers/helpers";

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
          <p>{comment.author} / {comment.created}</p>
          <div
            dangerouslySetInnerHTML={{__html: cleanHTML(comment.body_html)}}
          />
        </li>
      ))}
      </ul>
    </div>
  );
}

export default CommentsList;
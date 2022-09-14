import React from "react";
import dayjs from "dayjs";
import { cleanHTML } from "../../helpers/helpers";
import styles from './CommentsList.module.css';

const CommentsList = ({ comments, post }) => {
  if (comments.length === 0) {
    return (
      <div>
        <h2 className={styles.title}><span>/</span> No comments here</h2>
      </div>
    );
  }

  return (
    <div className={styles.comments}>
      <h2 className={styles.title}><span>/</span> Comments</h2>
      <ul className={styles.commentsLits}>
        {comments.map((comment) => (
          <li key={comment.id}>
            <p className={styles.meta}>
              <span>{dayjs.unix(comment.created).format('DD.MM.YYYY')}</span> / {comment.author}
            </p>
            <div
              className={styles.body}
              dangerouslySetInnerHTML={{ __html: cleanHTML(comment.body_html) }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CommentsList;
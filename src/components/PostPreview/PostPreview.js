import React from 'react';
import styles from './PostPreview.module.css';

export function PostPreview({ post }) {
  return (
    <article className={styles.post}>
      <div
        className={styles.preview}
      >
        <span
          className={styles.ratio}
          style={{ backgroundImage: `url(${post.thumbnail})` }}
        />
      </div>
      <h3 className={styles.title}>{post.title}</h3>
    </article>
  );
}
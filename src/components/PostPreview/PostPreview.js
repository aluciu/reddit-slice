import React from 'react';
import styles from './PostPreview.module.css';
import ROUTES from "../../app/routes";
import { Link, useLocation } from "react-router-dom";

export function PostPreview({ post }) {
  let location = useLocation();

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
      <h3 className={styles.title}>
        <Link
          to={`${location.pathname}?comments=${post.id}&subreddit=${post.subreddit}`}
        >
          {post.title}
        </Link>
      </h3>
    </article>
  );
}
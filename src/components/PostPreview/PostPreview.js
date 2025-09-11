import React from 'react';
import styles from './PostPreview.module.css';
import { cleanHTML } from "../../helpers/helpers";
import { Link, useLocation } from "react-router-dom";

export function PostPreview({ post }) {
  let location = useLocation();

  const thumbnail = (post.domain.includes("youtu.be") || post.domain.includes("youtube.com")) ?
    post.media?.oembed?.thumbnail_url : post.thumbnail;

  return (
    <article className={styles.post}>
      <div
        className={styles.preview}
      >
        <span
          className={styles.ratio}
          style={{ backgroundImage: `url(${thumbnail})` }}
        />
      </div>
      <h3 className={styles.title}>
        <Link
          to={`${location.pathname}?comments=${post.id}&subreddit=${post.subreddit}`}
        >
          <span dangerouslySetInnerHTML={{ __html: cleanHTML(post.title) }} />
        </Link>
      </h3>
    </article>
  );
}
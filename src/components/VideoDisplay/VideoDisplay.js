import React from "react";
import { cleanHTML, unEscape } from "../../helpers/helpers";
import styles from './VideoDisplay.module.css';

const VideoDisplay = ({ post }) => {
  if (post.post_hint === 'link') {
    return (
      <div className={styles.cover}>
        <a href={post.url} target="_blank" rel="noreferrer" className={styles.external}>
          <img src={unEscape(post.preview.images[0].source.url)} alt={post.title} />
          <span className={styles.overlay}>Open Outside</span>
        </a>
        <h3 className={styles.title}>{post.title}</h3>
      </div>
    );
  } else if (post.post_hint === 'self') {
    return (
      <div className={styles.cover}>
        <a href={post.url} target="_blank" rel="noreferrer" className={styles.external}>
          <span className={styles.noimage} />
          <span className={styles.overlay}>Open Outside</span>
        </a>
        <h3 className={styles.title}>{post.title}</h3>
      </div>
    );
  } else if (post.post_hint === 'hosted:video') {
    return (
      <div className={styles.cover}>
        <a href={post.url} target="_blank" rel="noreferrer" className={styles.external}>
          <img src={unEscape(post.preview.images[0].source.url)} alt={post.title} />
          <span className={styles.overlay}>Open Outside</span>
        </a>
        <h3 className={styles.title}>{post.title}</h3>
      </div>
    );
  } else if (post.crosspost_parent && post.crosspost_parent.length > 0) {
    return (
      <div className={styles.cover}>
        <a href={post.crosspost_parent_list[0].url} target="_blank" rel="noreferrer" className={styles.external}>
          <img src={unEscape(post.thumbnail)} alt={post.title} />
          <span className={styles.overlay}>Open Outside</span>
        </a>
        <h3 className={styles.title}>{post.title}</h3>
      </div>
    );
  }

  return (
    <div className={styles.cover}>
      <div className={styles.ratio}>
        <div
          className={styles.video}
          dangerouslySetInnerHTML={{ __html: cleanHTML(post.media_embed.content) }}
        />
      </div>
      <h3 className={styles.title}>{post.title}</h3>
    </div>
  );
}

export default VideoDisplay;
import React from "react";
import { cleanHTML, unEscape } from "../../helpers/helpers";
import styles from './VideoDisplay.module.css';

const VideoDisplay = ({ post }) => {
  console.log("VideoDisplay", post);
  if (post.post_hint === 'link') {
    return (
      <div className={styles.cover}>
        <img src={unEscape(post.preview.images[0].source.url)} alt={post.title} />
        <a href={post.url}>link</a>
        <h3>{post.title}</h3>
      </div>
    );
  } else if (post.post_hint === 'self') {
    return (
      <div>
         <h3>{post.title}</h3>
        <div
          dangerouslySetInnerHTML={{__html: cleanHTML(post.selftext_html)}}
        />
      </div>
    );
  } else if (post.post_hint === 'hosted:video') {
    return (
      <div>
        <img src={unEscape(post.preview.images[0].source.url)} alt={post.title} />
        <a href={post.url}>hosted video</a>
        <h3>{post.title}</h3>
      </div>
    );
  } else if (post.crosspost_parent && post.crosspost_parent.length > 0) {
    return (
      <div>
        <img src={unEscape(post.thumbnail)} alt={post.title} />
        <a href={post.crosspost_parent_list[0].url}>crosspost</a>
      </div>
    );
  }

  return (
    <div className={styles.cover}>
      <div className={styles.ratio}>
        <div
          className={styles.video}
          dangerouslySetInnerHTML={{__html: cleanHTML(post.media_embed.content)}}
        />
      </div>
      <h3 className={styles.title}>{post.title}</h3>
    </div>
  );
}

export default VideoDisplay;
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import styles from './PostPreview.module.css';
import 'react-loading-skeleton/dist/skeleton.css';

const PostLoading = () => {
  return (
    <article className={styles.post}>
      <Skeleton className={styles.preview} />
      <Skeleton className={styles.title} count={2} />
    </article>
  );
};

export default PostLoading;
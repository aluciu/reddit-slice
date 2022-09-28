import React from 'react';
import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <ul>
        <li><a href="https://github.com/aluciu">GitHub</a></li>
        <li><a href="https://www.codecademy.com/profiles/aluciu">CodeCademy</a></li>
        <li><a href="https://www.aluciu.ro/">aluciu.ro</a></li>
      </ul>
      <p><a href="https://discuss.codecademy.com/t/about-the-portfolio-project-reddit-project-category/535748">Project for CodeCademy Course</a></p>
    </footer>
  );
}
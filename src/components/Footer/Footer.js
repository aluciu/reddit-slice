import React from 'react';
import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <ul>
        <li><a href="">GitHub</a></li>
        <li><a href="">CodeAcademy</a></li>
        <li><a href="">aluciu.ro</a></li>
      </ul>
    </footer>
  );
}
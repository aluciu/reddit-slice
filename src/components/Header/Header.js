import React from "react";
import { Link, NavLink, } from "react-router-dom";
import styles from './Header.module.css';
import { appSubreddits } from "../../App";
import ROUTES from "../../app/routes";
import { Search } from "../Search/Search";


export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.top}>
        <h1 className={styles.logo}><Link to="/">reddit <span>/</span> slice</Link></h1>
        <div className={styles.search}>
          <Search />
        </div>
      </div>

      <nav className={styles.navigation}>
        <ul>
          {appSubreddits.map(subreddit => (
            <li key={subreddit}>
              <NavLink
                to={ROUTES.subreddit(subreddit)}
                activeClassName="active"
              >
                <span>/</span> {subreddit}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

    </header>
  );
}
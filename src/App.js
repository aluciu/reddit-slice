import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";
import ROUTES from "./app/routes";
import { Footer } from './components/Footer/Footer';
import './App.css';
import Posts from './features/posts/Posts';
import Comments from './features/comments/Comments';
import Featured from './features/posts/Featured';
import { Header } from './components/Header/Header';

const appSubreddits = [
  '80smusic',
  '90smusic',
  '2000sMusic',
  '2010sMusic',
];

function App() {
  return (
    <Router>
      <Header />
      <nav>
        <ul>
          {appSubreddits.map(subreddit => (
            <li>
              <NavLink
                to={ROUTES.subreddit(subreddit)}
                activeClassName="active"
              >
                {subreddit}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <Switch>
        <Route path="/subreddit/:name">
          <Posts />
        </Route>
        <Route path="/">
          {/* <Counter /> */}
          {appSubreddits.map(subreddit => (
            <Featured
              subreddit={subreddit}
            />
          ))}

          {/* <Comments /> */}
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;

import React from 'react';
import {
  Switch,
  Route,
  useLocation
} from "react-router-dom";
import { Footer } from './components/Footer/Footer';
import './App.css';
import Posts from './features/posts/Posts';
import Comments from './features/comments/Comments';
import Featured from './features/posts/Featured';
import { Header } from './components/Header/Header';

export const appSubreddits = [
  '80smusic',
  '90smusic',
  '2000sMusic',
  '2010sMusic',
];

function App() {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const postId = queryParams.get('comments');
  const subreddit = queryParams.get('subreddit');

  return (
    <>
      <Header />
      <Switch>
        <Route path="/subreddit/:name">
          <Posts />
        </Route>
        <Route path="/">
          {/* <Counter /> */}
          {appSubreddits.map(subreddit => (
            <Featured
              key={subreddit}
              subreddit={subreddit}
            />
          ))}


        </Route>
      </Switch>
      <Footer />

      {postId &&
        <Comments postId={postId} subreddit={subreddit} />
      }
    </>
  );
}

export default App;

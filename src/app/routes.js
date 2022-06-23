const ROUTES = {
  subreddit: (name) => `/subreddit/${name}`,
  comments: (postId) => `/subreddit/${postId}`,
};

export default ROUTES;
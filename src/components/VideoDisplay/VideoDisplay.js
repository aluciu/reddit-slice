import React from "react";
import DOMPurify from "dompurify";

const VideoDisplay = ({ post }) => {
  if (post.post_hint === 'link') {
    return (
      <div>
        <img src={unEscape(post.preview.images[0].source.url)} alt={post.title} />
        {post.url}
        <h3>{post.title}</h3>
      </div>
    );
  }
  return (
    <div>
      <div>
        <div
          dangerouslySetInnerHTML={{__html: cleanHTML(post.media_embed.content)}}
        />
      </div>
      <h3>{post.title}</h3>
    </div>
  );
}


function unEscape(htmlStr) {
  htmlStr = htmlStr.replace(/&lt;/g , "<");
  htmlStr = htmlStr.replace(/&gt;/g , ">");
  htmlStr = htmlStr.replace(/&quot;/g , "\"");
  // eslint-disable-next-line
  htmlStr = htmlStr.replace(/&#39;/g , "\'");
  htmlStr = htmlStr.replace(/&amp;/g , "&");
  return htmlStr;
}

const cleanHTML = (content) => DOMPurify.sanitize(unEscape(content), {
  ALLOWED_TAGS: ['iframe']
});

export default VideoDisplay;
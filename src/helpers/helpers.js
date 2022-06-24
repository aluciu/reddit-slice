import DOMPurify from "dompurify";

export function unEscape(htmlStr) {
  htmlStr = htmlStr.replace(/&lt;/g , "<");
  htmlStr = htmlStr.replace(/&gt;/g , ">");
  htmlStr = htmlStr.replace(/&quot;/g , "\"");
  // eslint-disable-next-line
  htmlStr = htmlStr.replace(/&#39;/g , "\'");
  htmlStr = htmlStr.replace(/&amp;/g , "&");
  return htmlStr;
}

export function cleanHTML(content) {
  return DOMPurify.sanitize(unEscape(content), {
    ALLOWED_TAGS: ['iframe', 'a']
  });
}
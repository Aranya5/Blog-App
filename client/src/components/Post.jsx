import { formatISO9075 } from "date-fns";

function Post({ title, summary, cover, content, createdAt, author }) {
  console.log({
    title,
    summary,
    cover,
    content,
    author,
  });
  return (
    <div className="post">
      <div className="image">
        <img src={"http://localhost:4000/" + cover} alt="blog pic" />
      </div>
      <div className="texts">
        <h2>{title}</h2>
        <p className="info">
          <a className="author">{author?.username || "Unknown Author"}</a>
          <time>{createdAt ? formatISO9075(new Date(createdAt)) : ""}</time>
        </p>
        <p className="summary">{summary}</p>
      </div>
    </div>
  );
}

export default Post;

import { useEffect, useState } from "react";
import Post from "../components/Post";

function IndexPage() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4000/post").then((response) => {
      response.json().then((posts) => {
        setPosts(posts);
      });
    });
  }, []);
  console.log(posts);
  return <>{posts.length > 0 && posts.map((post) => <Post key={post._id} {...post} />)}</>;
}
export default IndexPage;

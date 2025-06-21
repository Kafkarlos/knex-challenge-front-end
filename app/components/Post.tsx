import { useEffect, useState } from "react";
import axios from "axios";

type Post = {
  id: number;
  title: string;
  body: string;
};

export default function Post() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/posts?_limit=1") 
      .then(response => {
        setPosts(response.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <p>Carregando post...</p>;

  return (
    <section>
      {posts.map(post => (
        <div key={post.id} className="">
          <h2 className="text-black font-bold font-lato text-3xl text-center p-4">{post.title}</h2>
          <p className="text-black font-lato p-5">{post.body}</p>
        </div>
      ))}
    </section>
  );
}
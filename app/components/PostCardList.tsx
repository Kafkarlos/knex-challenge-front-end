import { useState, useEffect } from "react";
import PostCard from "./PostCard";
import axios from "axios";

export type Post = {
  id: number;
  title: string;
  body: string;
};

export default function PostCardList() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/posts?_limit=1").then((res) => {
      setPosts(res.data);
    });
  }, []);

  const handleAddPost = () => {
    const newPost: Post = {
      id: Date.now(),
      title: "Novo Post",
      body: "Conteúdo do novo post.",
    };
    setPosts((prev) => [...prev, newPost]);
  };

  return (
    <section className="flex-2/12 justify-items-center">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
      <button 
        onClick={handleAddPost}
        className="bg-red-10 p-4 mt-4 w-50 text-2xl font-mw font-bold col-start-2 grid grid-cols-3 items-center rounded-xl transition-all duration-700 ease-in-out hover:bg-purple-950">
        <figure className="w-10">
            <img src="public/images/pena.png" alt="Pena"/>
        </figure>
        <p className="col-span-2">New Post</p>
        </button>
    </section>
  );
}

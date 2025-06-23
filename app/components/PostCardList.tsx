import { useState, useEffect } from "react";
import PostCard from "./PostCard";
import { PostSkeleton } from "./PostSkeleton";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useAuth } from "../contexts/AuthContext";

export type Post = {
  id: number;
  title: string;
  body: string;
};

export default function PostCardList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [showModal, setShowModal] = useState(false);
  const { user, loading } = useAuth();

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      title: "",
      body: "",
    },
  });

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts?_limit=1")
      .then((res) => {
        setPosts(res.data);
      });
  }, []);

  const handleAddPost = (data: { title: string; body: string }) => {
    const newPost: Post = {
      id: Date.now(),
      title: data.title,
      body: data.body,
    };
    setPosts((prev) => [...prev, newPost]);
    reset({ title: "", body: "" });
    setShowModal(false);
  };

  if (loading) return <PostSkeleton />;

  if (!user) return <p>Erro ao carregar usuário</p>;
  return (
    <>
      <section className="flex-2/12 justify-items-center">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
        <button
          onClick={() => setShowModal(true)}
          className="bg-red-10 p-4 mt-4 w-50 text-2xl font-mw font-bold col-start-2 grid grid-cols-3 items-center rounded-xl transition-all duration-700 ease-in-out hover:bg-purple-950"
        >
          <figure className="w-10">
            <img src="public/images/pena.png" alt="Pena" />
          </figure>
          <p className="col-span-2">New Post</p>
        </button>
      </section>
      {showModal && (
        <div className="fixed inset-0 bg-opacity-40 flex items-center justify-center ">
          <div className="bg-white-10 p-6 rounded shadow-xl w-[50%] h-[50%] grid items-center">
            <h3 className="text-4xl text-purple-10 font-mw font-bold">
              New Post
            </h3>
            <form onSubmit={handleSubmit(handleAddPost)} className="space-y-4">
              <div>
                <label className="block text-black text-2xl font-mw font-bold">
                  Título
                </label>
                <input
                  type="text"
                  {...register("title", { required: true })}
                  className="w-full border-1 rounded-2xl border-black text-xl text-black p-2"
                  maxLength={100}
                  placeholder="Título do seu Post"
                />
              </div>
              <div>
                <label className="block text-black text-2xl font-mw font-bold">
                  Conteúdo
                </label>
                <textarea
                  rows={6}
                  {...register("body", { required: true })}
                  className="w-full border-1 rounded-2xl border-black text-xl text-black p-2"
                  placeholder="Conteúdo do seu Post"
                />
              </div>
              <div className="flex justify-center space-x-20">
                <button
                  type="button"
                  onClick={() => {
                    reset({ title: "", body: "" });
                    setShowModal(false);
                  }}
                  className="p-3 rounded-lg bg-red-800 transition-colors ease-in-out duration-200 hover:bg-red-10 text-lg "
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="p-3 rounded-lg bg-green-900 transition-colors ease-in-out duration-200 hover:bg-green-600 text-lg "
                >
                  Publicar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

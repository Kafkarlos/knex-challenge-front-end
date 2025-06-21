import Header from "../components/Header";
import Footer from "../components/Footer";
import User from "../components/User";
import PostCard from "../components/PostCard";

export function Welcome() {
  return (
    <>
      <Header />
      <main className="min-h-200 grid grid-cols-4 justify-items-center">
        <section className="col-start-2">
          <PostCard />
        </section>
        <User />
      </main>
      <Footer />
    </>
  );
}

import Header from "../components/Header";
import Footer from "../components/Footer";
import User from "../components/User";
import PostCardList from "~/components/PostCardList";

export function Welcome() {
  return (
    <>
      <Header />
      <main className="min-h-200 grid grid-cols-4 justify-items-center">
        <section className="flex-3/12 justify-items-center col-start-2">
          <PostCardList />
        </section>
        <User />
      </main>
      <Footer />
    </>
  );
}

import Header from "../components/Header";
import Footer from "../components/Footer";
import User from "../components/User";

export function Welcome() {
  return (
    <>
      <Header />
      <main className="min-h-200 grid grid-cols-2 justify-items-center">
        <section>
          <p>Post</p>
        </section>
        <User />
      </main>
      <Footer />
    </>
  );
}

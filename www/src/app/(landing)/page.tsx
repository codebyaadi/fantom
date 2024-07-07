import ShowProduct from "./_components/show-products";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between pt-32 mx-8">
      <div className="flex flex-col items-center justify-center text-center">
        <span></span>
        <h1 className="font-unbounded text-4xl font-medium tracking-wide">
          Dive into a World of Stories
        </h1>
        <p className="mt-1 max-w-lg font-prompt text-sm font-normal text-foreground/70">
          Find your next binge-worthy manga, manhwa, or manhua: Explore endless
          genres, join discussions, and share your favorites with the community.
        </p>
      </div>
      <ShowProduct />
    </main>
  );
}

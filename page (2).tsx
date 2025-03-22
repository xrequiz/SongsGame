import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-6xl font-bold text-center mb-8">
            Song Guessing Contest
          </h1>
          <p className="text-xl text-center mb-12">
            Welcome to the ultimate song guessing challenge! Test your music knowledge by guessing songs from different genres.
            Play with friends and see who has the best ear for music!
          </p>
          <Link 
            href="/players" 
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg text-xl transition-colors duration-300"
          >
            Start Game
          </Link>
        </div>
      </div>
    </main>
  );
}

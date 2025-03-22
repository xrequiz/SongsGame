'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

// Define the genres we'll use for the game
const GENRES = [
  { id: 'pop', name: 'Pop', description: 'Popular music with catchy melodies and rhythms' },
  { id: 'rock', name: 'Rock', description: 'Guitar-driven music with strong beats and vocals' },
  { id: 'hiphop', name: 'Hip Hop', description: 'Rhythmic music with rapping and beats' },
  { id: 'country', name: 'Country', description: 'Music with roots in folk, blues and western styles' },
  { id: 'electronic', name: 'Electronic', description: 'Computer-generated music with synthesized sounds' },
];

export default function GenrePage() {
  const router = useRouter();
  const [selectedGenre, setSelectedGenre] = useState<string>('');

  const handleGenreSelect = (genreId: string) => {
    setSelectedGenre(genreId);
  };

  const handleContinue = () => {
    if (selectedGenre) {
      // Store selected genre in localStorage
      localStorage.setItem('selectedGenre', selectedGenre);
      
      // Navigate to game page
      router.push('/game');
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold text-center mb-8">
            Select a Music Genre
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl mb-8">
            {GENRES.map((genre) => (
              <div 
                key={genre.id}
                onClick={() => handleGenreSelect(genre.id)}
                className={`
                  p-6 border rounded-lg cursor-pointer transition-all duration-300
                  ${selectedGenre === genre.id 
                    ? 'border-blue-500 bg-blue-50 shadow-md' 
                    : 'border-gray-300 hover:border-blue-300 hover:bg-blue-50'}
                `}
              >
                <h2 className="text-2xl font-bold mb-2">{genre.name}</h2>
                <p className="text-gray-600">{genre.description}</p>
              </div>
            ))}
          </div>
          
          <button
            onClick={handleContinue}
            disabled={!selectedGenre}
            className={`
              font-bold py-3 px-6 rounded-lg text-white text-xl
              ${selectedGenre 
                ? 'bg-blue-600 hover:bg-blue-700 cursor-pointer' 
                : 'bg-gray-400 cursor-not-allowed'}
            `}
          >
            Start Game
          </button>
        </div>
      </div>
    </main>
  );
}

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function PlayersPage() {
  const router = useRouter();
  const [players, setPlayers] = useState<string[]>(['', '']);
  const [error, setError] = useState('');

  const handlePlayerNameChange = (index: number, name: string) => {
    const newPlayers = [...players];
    newPlayers[index] = name;
    setPlayers(newPlayers);
  };

  const addPlayer = () => {
    setPlayers([...players, '']);
  };

  const removePlayer = (index: number) => {
    if (players.length > 2) {
      const newPlayers = [...players];
      newPlayers.splice(index, 1);
      setPlayers(newPlayers);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate player names
    if (players.some(player => !player.trim())) {
      setError('All player names must be filled');
      return;
    }
    
    // Store player names in localStorage
    localStorage.setItem('players', JSON.stringify(players));
    
    // Navigate to genre selection
    router.push('/genre');
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold text-center mb-8">
            Enter Player Names
          </h1>
          
          <form onSubmit={handleSubmit} className="w-full max-w-md">
            {players.map((player, index) => (
              <div key={index} className="flex items-center mb-4">
                <input
                  type="text"
                  value={player}
                  onChange={(e) => handlePlayerNameChange(index, e.target.value)}
                  placeholder={`Player ${index + 1}`}
                  className="flex-grow p-3 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {players.length > 2 && (
                  <button
                    type="button"
                    onClick={() => removePlayer(index)}
                    className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-r-lg"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            
            {error && <p className="text-red-500 mb-4">{error}</p>}
            
            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={addPlayer}
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
              >
                Add Player
              </button>
              
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Continue to Genres
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

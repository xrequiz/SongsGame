'use client';

import { useState, useEffect, useRef } from 'react';
import YouTube from 'react-youtube';
import { songData } from '@/src/lib/songData';
import { Song } from '@/src/lib/types';

export default function GamePage() {
  // Player state
  const [players, setPlayers] = useState<string[]>([]);
  const [scores, setScores] = useState<Record<string, number>>({});
  
  // Game state
  const [selectedGenre, setSelectedGenre] = useState<string>('');
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isSongRevealed, setIsSongRevealed] = useState<boolean>(false);
  const [availableSongs, setAvailableSongs] = useState<Song[]>([]);
  
  // YouTube player reference
  const playerRef = useRef<any>(null);
  
  // Initialize game state from localStorage
  useEffect(() => {
    const storedPlayers = localStorage.getItem('players');
    const storedGenre = localStorage.getItem('selectedGenre');
    
    if (storedPlayers) {
      const parsedPlayers = JSON.parse(storedPlayers);
      setPlayers(parsedPlayers);
      
      // Initialize scores for each player
      const initialScores: Record<string, number> = {};
      parsedPlayers.forEach((player: string) => {
        initialScores[player] = 0;
      });
      setScores(initialScores);
    }
    
    if (storedGenre) {
      setSelectedGenre(storedGenre);
      // Initialize available songs for the selected genre
      setAvailableSongs([...songData[storedGenre]]);
    }
  }, []);
  
  // Handle keyboard events for buzzer functionality
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Space key as buzzer
      if (event.code === 'Space' && isPlaying) {
        event.preventDefault();
        pauseSong();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isPlaying]);
  
  // Select a random song from the available songs
  const selectRandomSong = () => {
    if (availableSongs.length === 0) {
      // If all songs have been played, reset the available songs
      setAvailableSongs([...songData[selectedGenre]]);
      return;
    }
    
    const randomIndex = Math.floor(Math.random() * availableSongs.length);
    const selected = availableSongs[randomIndex];
    
    // Remove the selected song from available songs
    const updatedSongs = [...availableSongs];
    updatedSongs.splice(randomIndex, 1);
    
    setCurrentSong(selected);
    setAvailableSongs(updatedSongs);
    setIsSongRevealed(false);
  };
  
  // Start playing the current song
  const playSong = () => {
    if (playerRef.current && currentSong) {
      playerRef.current.internalPlayer.playVideo();
      setIsPlaying(true);
    }
  };
  
  // Pause the current song (buzzer functionality)
  const pauseSong = () => {
    if (playerRef.current) {
      playerRef.current.internalPlayer.pauseVideo();
      setIsPlaying(false);
    }
  };
  
  // Reveal the current song
  const revealSong = () => {
    setIsSongRevealed(true);
  };
  
  // Add a point to a player's score
  const addPoint = (playerName: string) => {
    setScores(prevScores => ({
      ...prevScores,
      [playerName]: (prevScores[playerName] || 0) + 1
    }));
  };
  
  // YouTube player options
  const opts = {
    height: '0',
    width: '0',
    playerVars: {
      autoplay: 0,
      controls: 0,
      disablekb: 1,
      fs: 0,
      modestbranding: 1,
    },
  };
  
  // YouTube player ready event handler
  const onReady = (event: any) => {
    playerRef.current = event;
  };
  
  return (
    <main className="flex min-h-screen flex-col items-center p-8">
      <div className="w-full max-w-4xl">
        <h1 className="text-4xl font-bold text-center mb-8">
          Song Guessing Contest
        </h1>
        
        {/* Scoreboard */}
        <div className="bg-gray-100 p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-bold mb-4">Scoreboard</h2>
          <div className="grid grid-cols-2 gap-4">
            {players.map((player) => (
              <div key={player} className="flex justify-between items-center p-3 bg-white rounded shadow">
                <span className="font-semibold">{player}</span>
                <span className="text-xl font-bold">{scores[player] || 0}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Game Controls */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="flex flex-col items-center mb-6">
            <h2 className="text-2xl font-bold mb-2">
              {selectedGenre ? `Genre: ${selectedGenre.charAt(0).toUpperCase() + selectedGenre.slice(1)}` : 'Select a genre'}
            </h2>
            
            {currentSong ? (
              <div className="w-full">
                <div className="flex justify-between items-center mb-4">
                  <button
                    onClick={playSong}
                    disabled={isPlaying}
                    className={`px-4 py-2 rounded font-bold ${
                      isPlaying ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600 text-white'
                    }`}
                  >
                    Play
                  </button>
                  
                  <button
                    onClick={pauseSong}
                    disabled={!isPlaying}
                    className={`px-4 py-2 rounded font-bold ${
                      !isPlaying ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600 text-white'
                    }`}
                  >
                    Buzzer (Space)
                  </button>
                  
                  <button
                    onClick={revealSong}
                    className="px-4 py-2 rounded font-bold bg-blue-500 hover:bg-blue-600 text-white"
                  >
                    Reveal Song
                  </button>
                </div>
                
                {isSongRevealed && (
                  <div className="bg-blue-50 p-4 rounded-lg mb-4">
                    <h3 className="text-xl font-bold">{currentSong.title}</h3>
                    <p className="text-gray-700">{currentSong.artist}</p>
                  </div>
                )}
                
                {!isPlaying && (
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold mb-2">Add point to:</h3>
                    <div className="flex flex-wrap gap-2">
                      {players.map((player) => (
                        <button
                          key={player}
                          onClick={() => addPoint(player)}
                          className="px-3 py-1 bg-purple-500 hover:bg-purple-600 text-white rounded"
                        >
                          {player}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-gray-600 mb-4">Click "Next Song" to start the game</p>
            )}
            
            <button
              onClick={selectRandomSong}
              className="mt-6 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg"
            >
              Next Song
            </button>
          </div>
          
          <div className="text-center text-sm text-gray-500">
            <p>Press the space bar to use the buzzer when you recognize the song!</p>
          </div>
        </div>
        
        {/* Hidden YouTube Player */}
        <div className="hidden">
          {currentSong && (
            <YouTube
              videoId={currentSong.id}
              opts={opts}
              onReady={onReady}
            />
          )}
        </div>
      </div>
    </main>
  );
}

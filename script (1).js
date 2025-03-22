// Global variables
let players = [];
let scores = {};
let selectedGenre = '';
let currentSong = null;
let isPlaying = false;
let isSongRevealed = false;
let availableSongs = [];
let player = null;

// DOM Elements
const homePage = document.getElementById('home-page');
const playersPage = document.getElementById('players-page');
const genrePage = document.getElementById('genre-page');
const gamePage = document.getElementById('game-page');

// Navigation functions
document.getElementById('start-game-btn').addEventListener('click', () => {
    homePage.classList.add('hidden');
    playersPage.classList.remove('hidden');
});

// Players page functionality
document.getElementById('add-player-btn').addEventListener('click', () => {
    const playersContainer = document.getElementById('players-container');
    const playerCount = playersContainer.children.length + 1;
    
    const playerDiv = document.createElement('div');
    playerDiv.className = 'flex items-center mb-4';
    
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = `Player ${playerCount}`;
    input.className = 'player-input flex-grow p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500';
    
    const removeBtn = document.createElement('button');
    removeBtn.className = 'bg-red-500 hover:bg-red-600 text-white p-3 rounded-r-lg ml-2';
    removeBtn.textContent = 'Remove';
    removeBtn.addEventListener('click', () => {
        playersContainer.removeChild(playerDiv);
    });
    
    playerDiv.appendChild(input);
    playerDiv.appendChild(removeBtn);
    playersContainer.appendChild(playerDiv);
});

document.getElementById('continue-to-genres-btn').addEventListener('click', () => {
    const playerInputs = document.querySelectorAll('.player-input');
    players = [];
    
    for (const input of playerInputs) {
        const name = input.value.trim();
        if (name) {
            players.push(name);
        }
    }
    
    if (players.length < 2) {
        document.getElementById('players-error').classList.remove('hidden');
        return;
    }
    
    // Initialize scores
    scores = {};
    players.forEach(player => {
        scores[player] = 0;
    });
    
    document.getElementById('players-error').classList.add('hidden');
    playersPage.classList.add('hidden');
    genrePage.classList.remove('hidden');
});

// Genre page functionality
const genreItems = document.querySelectorAll('.genre-item');
genreItems.forEach(item => {
    item.addEventListener('click', () => {
        // Remove selected class from all genres
        genreItems.forEach(g => {
            g.classList.remove('border-blue-500', 'bg-blue-50', 'shadow-md');
            g.classList.add('border-gray-300');
        });
        
        // Add selected class to clicked genre
        item.classList.remove('border-gray-300');
        item.classList.add('border-blue-500', 'bg-blue-50', 'shadow-md');
        
        // Enable start game button
        const startGameBtn = document.getElementById('start-game-genre-btn');
        startGameBtn.disabled = false;
        startGameBtn.classList.remove('bg-gray-400', 'cursor-not-allowed');
        startGameBtn.classList.add('bg-blue-600', 'hover:bg-blue-700', 'cursor-pointer');
        
        // Store selected genre
        selectedGenre = item.getAttribute('data-genre');
    });
});

document.getElementById('start-game-genre-btn').addEventListener('click', () => {
    if (!selectedGenre) return;
    
    // Initialize available songs for the selected genre
    availableSongs = [...songData[selectedGenre]];
    
    // Update genre display
    document.getElementById('genre-display').textContent = `Genre: ${selectedGenre.charAt(0).toUpperCase() + selectedGenre.slice(1)}`;
    
    // Populate scoreboard
    const scoreboard = document.getElementById('scoreboard');
    scoreboard.innerHTML = '';
    
    players.forEach(player => {
        const playerDiv = document.createElement('div');
        playerDiv.className = 'flex justify-between items-center p-3 bg-white rounded shadow';
        playerDiv.innerHTML = `
            <span class="font-semibold">${player}</span>
            <span class="text-xl font-bold">${scores[player] || 0}</span>
        `;
        scoreboard.appendChild(playerDiv);
    });
    
    // Navigate to game page
    genrePage.classList.add('hidden');
    gamePage.classList.remove('hidden');
});

// YouTube API
let youtubeReady = false;
function onYouTubeIframeAPIReady() {
    youtubeReady = true;
}

// Game page functionality
document.getElementById('next-song-btn').addEventListener('click', selectRandomSong);
document.getElementById('play-btn').addEventListener('click', playSong);
document.getElementById('buzzer-btn').addEventListener('click', pauseSong);
document.getElementById('reveal-btn').addEventListener('click', revealSong);
document.getElementById('back-to-genres-btn').addEventListener('click', () => {
    // Stop the song if it's playing
    if (player) {
        player.stopVideo();
    }
    
    // Reset game state
    isPlaying = false;
    isSongRevealed = false;
    currentSong = null;
    
    // Hide game page and show genre page
    gamePage.classList.add('hidden');
    genrePage.classList.remove('hidden');
});

// Select a random song
function selectRandomSong() {
    if (availableSongs.length === 0) {
        // If all songs have been played, reset the available songs
        availableSongs = [...songData[selectedGenre]];
    }
    
    const randomIndex = Math.floor(Math.random() * availableSongs.length);
    currentSong = availableSongs[randomIndex];
    
    // Remove the selected song from available songs
    availableSongs.splice(randomIndex, 1);
    
    // Reset song state
    isPlaying = false;
    isSongRevealed = false;
    pointAwardedThisRound = false; // Reset point awarded status for new round
    document.getElementById('song-reveal').classList.add('hidden');
    document.getElementById('add-point-container').classList.add('hidden');
    
    // Update UI
    document.getElementById('play-btn').disabled = false;
    document.getElementById('play-btn').classList.remove('bg-gray-400', 'cursor-not-allowed');
    document.getElementById('play-btn').classList.add('bg-green-500', 'hover:bg-green-600');
    
    document.getElementById('buzzer-btn').disabled = true;
    document.getElementById('buzzer-btn').classList.add('bg-gray-400', 'cursor-not-allowed');
    document.getElementById('buzzer-btn').classList.remove('bg-red-500', 'hover:bg-red-600');
    
    document.getElementById('game-controls').classList.remove('hidden');
    document.getElementById('game-instruction').classList.add('hidden');
    
    // Initialize YouTube player if not already
    if (!player && youtubeReady) {
        player = new YT.Player('youtube-player', {
            height: '0',
            width: '0',
            videoId: currentSong.id,
            playerVars: {
                autoplay: 0,
                controls: 0,
                disablekb: 1,
                fs: 0,
                modestbranding: 1,
            },
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });
    } else if (player && youtubeReady) {
        player.loadVideoById(currentSong.id);
        player.stopVideo();
    }
}

// YouTube player events
function onPlayerReady(event) {
    // Player is ready
}

function onPlayerStateChange(event) {
    // 0 = ended, 1 = playing, 2 = paused
    if (event.data === 1) {
        isPlaying = true;
        
        document.getElementById('play-btn').disabled = true;
        document.getElementById('play-btn').classList.add('bg-gray-400', 'cursor-not-allowed');
        document.getElementById('play-btn').classList.remove('bg-green-500', 'hover:bg-green-600');
        
        document.getElementById('buzzer-btn').disabled = false;
        document.getElementById('buzzer-btn').classList.remove('bg-gray-400', 'cursor-not-allowed');
        document.getElementById('buzzer-btn').classList.add('bg-red-500', 'hover:bg-red-600');
    } else if (event.data === 2) {
        isPlaying = false;
        
        document.getElementById('play-btn').disabled = false;
        document.getElementById('play-btn').classList.remove('bg-gray-400', 'cursor-not-allowed');
        document.getElementById('play-btn').classList.add('bg-green-500', 'hover:bg-green-600');
        
        document.getElementById('buzzer-btn').disabled = true;
        document.getElementById('buzzer-btn').classList.add('bg-gray-400', 'cursor-not-allowed');
        document.getElementById('buzzer-btn').classList.remove('bg-red-500', 'hover:bg-red-600');
        
        // Show add point options
        showAddPointOptions();
    }
}

// Play the current song
function playSong() {
    if (player && currentSong) {
        player.playVideo();
    }
}

// Pause the current song (buzzer functionality)
function pauseSong() {
    if (player) {
        player.pauseVideo();
    }
}

// Reveal the current song
function revealSong() {
    if (!currentSong) return;
    
    isSongRevealed = true;
    
    // Make sure we're revealing the correct song information
    const songTitle = document.getElementById('song-title');
    const songArtist = document.getElementById('song-artist');
    
    // Clear previous content first
    songTitle.textContent = '';
    songArtist.textContent = '';
    
    // Get the currently loaded video ID to ensure correlation
    const currentVideoId = player ? player.getVideoData().video_id : null;
    
    // Double check that the currentSong matches the currently playing video
    if (currentVideoId && currentVideoId !== currentSong.id) {
        // If there's a mismatch, find the correct song from the current genre
        const correctSong = songData[selectedGenre].find(song => song.id === currentVideoId);
        if (correctSong) {
            currentSong = correctSong;
        }
    }
    
    // Set the current song information
    songTitle.textContent = currentSong.title;
    songArtist.textContent = currentSong.artist;
    
    document.getElementById('song-reveal').classList.remove('hidden');
}

// Show add point options
function showAddPointOptions() {
    const addPointContainer = document.getElementById('add-point-container');
    const playerPointsBtns = document.getElementById('player-points-btns');
    
    playerPointsBtns.innerHTML = '';
    
    // Add confetti effect to celebrate guessing
    createConfetti();
    
    players.forEach(player => {
        const btn = document.createElement('button');
        btn.className = 'px-3 py-1 bg-purple-500 hover:bg-purple-600 text-white rounded';
        btn.textContent = player;
        btn.addEventListener('click', () => addPoint(player));
        
        playerPointsBtns.appendChild(btn);
    });
    
    addPointContainer.classList.remove('hidden');
}

// Create confetti effect
function createConfetti() {
    const container = document.querySelector('.container');
    const colors = ['#f00', '#0f0', '#00f', '#ff0', '#0ff', '#f0f'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.width = Math.random() * 10 + 5 + 'px';
        confetti.style.height = Math.random() * 10 + 5 + 'px';
        confetti.style.animationDuration = Math.random() * 3 + 2 + 's';
        container.appendChild(confetti);
        
        // Remove confetti after animation
        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
}

// Track if a point has been awarded for the current round
let pointAwardedThisRound = false;

// Add a point to a player's score
function addPoint(playerName) {
    // Check if a point has already been awarded this round
    if (pointAwardedThisRound) {
        // Show a message that only one point can be awarded per round
        alert('Only one point can be awarded per round!');
        return;
    }
    
    // Award the point and mark this round as having a point awarded
    scores[playerName] = (scores[playerName] || 0) + 1;
    pointAwardedThisRound = true;
    
    // Disable all point buttons after awarding a point
    const pointButtons = document.querySelectorAll('#player-points-btns button');
    pointButtons.forEach(btn => {
        btn.disabled = true;
        btn.classList.add('opacity-50', 'cursor-not-allowed');
    });
    
    // Update scoreboard with animation for the player who got the point
    const scoreboard = document.getElementById('scoreboard');
    scoreboard.innerHTML = '';
    
    players.forEach(player => {
        const playerDiv = document.createElement('div');
        playerDiv.className = 'scoreboard-item flex justify-between items-center p-3 bg-white rounded shadow';
        
        // Add pulse animation to the player who got the point
        if (player === playerName) {
            playerDiv.classList.add('pulse-animation');
        }
        
        playerDiv.innerHTML = `
            <span class="font-semibold">${player}</span>
            <span class="text-xl font-bold">${scores[player] || 0}</span>
        `;
        scoreboard.appendChild(playerDiv);
    });
}

// Space key as buzzer
document.addEventListener('keydown', (event) => {
    if (event.code === 'Space' && isPlaying) {
        event.preventDefault();
        pauseSong();
    }
});
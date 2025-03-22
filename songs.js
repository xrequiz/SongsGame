// Song data for each genre
const songData = {
  pop: [
    { id: 'JGwWNGJdvx8', title: 'Shape of You', artist: 'Ed Sheeran' },
    { id: 'kJQP7kiw5Fk', title: 'Despacito', artist: 'Luis Fonsi ft. Daddy Yankee' },
    { id: 'RgKAFK5djSk', title: 'See You Again', artist: 'Wiz Khalifa ft. Charlie Puth' },
    { id: 'CevxZvSJLk8', title: 'Roar', artist: 'Katy Perry' },
    { id: 'JRfuAukYTKg', title: 'Uptown Funk', artist: 'Mark Ronson ft. Bruno Mars' },
    { id: 'OPf0YbXqDm0', title: 'Can\'t Stop the Feeling', artist: 'Justin Timberlake' },
    { id: 'pRpeEdMmmQ0', title: 'Levitating', artist: 'Dua Lipa' },
    { id: 'papuvlVeZg8', title: 'Bad Guy', artist: 'Billie Eilish' },
    { id: 'iX-QaNzd-0Y', title: 'Blinding Lights', artist: 'The Weeknd' },
    { id: 'QYh6mYIJG2Y', title: 'Watermelon Sugar', artist: 'Harry Styles' }
  ],
  rock: [
    { id: 'fJ9rUzIMcZQ', title: 'Bohemian Rhapsody', artist: 'Queen' },
    { id: 'n4RjJKxsamQ', title: 'Smells Like Teen Spirit', artist: 'Nirvana' },
    { id: 'eVTXPUF4Oz4', title: 'In The End', artist: 'Linkin Park' },
    { id: 'hTWKbfoikeg', title: 'Come As You Are', artist: 'Nirvana' },
    { id: 'YR5ApYxkU-U', title: 'Paradise City', artist: 'Guns N\' Roses' },
    { id: 'lDK9QqIzhwk', title: 'Living on a Prayer', artist: 'Bon Jovi' },
    { id: '1w7OgIMMRc4', title: 'Sweet Child O\' Mine', artist: 'Guns N\' Roses' },
    { id: 'qeMFqkcPYcg', title: 'Sweet Dreams', artist: 'Eurythmics' },
    { id: 'v2AC41dglnM', title: 'Thunderstruck', artist: 'AC/DC' },
    { id: 'xwtdhWltSIg', title: 'Enter Sandman', artist: 'Metallica' }
  ],
  hiphop: [
    { id: 'uelHwf8o7_U', title: 'Love The Way You Lie', artist: 'Eminem ft. Rihanna' },
    { id: 'YVkUvmDQ3HY', title: 'Without Me', artist: 'Eminem' },
    { id: 'RubBzkZzpUA', title: 'Lose Yourself', artist: 'Eminem' },
    { id: 'r_0JjYUe5jo', title: 'HUMBLE.', artist: 'Kendrick Lamar' },
    { id: 'QYh6mYIJG2Y', title: 'Sicko Mode', artist: 'Travis Scott' },
    { id: 'bnCT0GXgLJg', title: 'Hotline Bling', artist: 'Drake' },
    { id: 'JZjAg6fK-BQ', title: 'God\'s Plan', artist: 'Drake' },
    { id: 'tvTRZJ-4EyI', title: 'DNA.', artist: 'Kendrick Lamar' },
    { id: 'PMivT7MJ41M', title: 'Straight Outta Compton', artist: 'NWA' },
    { id: 'fPO76Jlnz6c', title: 'Alright', artist: 'Kendrick Lamar' }
  ],
  country: [
    { id: 'JXRN_LkCa_o', title: 'Cruise', artist: 'Florida Georgia Line' },
    { id: 'BKZqGJONH68', title: 'Meant to Be', artist: 'Bebe Rexha ft. Florida Georgia Line' },
    { id: 'mWrd5yxIzk4', title: 'Body Like A Back Road', artist: 'Sam Hunt' },
    { id: 'Mdh2p03cRfw', title: 'Chicken Fried', artist: 'Zac Brown Band' },
    { id: 'WaSy8yy-mr8', title: 'Before He Cheats', artist: 'Carrie Underwood' },
    { id: 'oOlDewpCfZQ', title: 'Wagon Wheel', artist: 'Darius Rucker' },
    { id: 'X5z-jjWyAJQ', title: 'Dirt On My Boots', artist: 'Jon Pardi' },
    { id: 'Vd2qlMV-seQ', title: 'Tennessee Whiskey', artist: 'Chris Stapleton' },
    { id: 'FY8SwIvxj8o', title: 'Take Me Home, Country Roads', artist: 'John Denver' },
    { id: 'aJrhh-9Wl6o', title: 'The Dance', artist: 'Garth Brooks' }
  ],
  electronic: [
    { id: 'gCYcHz2k5x0', title: 'Animals', artist: 'Martin Garrix' },
    { id: 'k85mRPqvMbE', title: 'Sandstorm', artist: 'Darude' },
    { id: '3O1_3zBUKM8', title: 'Lean On', artist: 'Major Lazer & DJ Snake ft. MØ' },
    { id: 'jofNR_WkoCE', title: 'The Fox (What Does The Fox Say?)', artist: 'Ylvis' },
    { id: 'YJVmu6yttiw', title: 'Faded', artist: 'Alan Walker' },
    { id: 'kdemFfbS5H0', title: 'Strobe', artist: 'Deadmau5' },
    { id: 'qrOeGCJdZe4', title: 'Levels', artist: 'Avicii' },
    { id: 'a7SouU3ECpU', title: 'Summer', artist: 'Calvin Harris' },
    { id: 'jGflUbPQfW8', title: 'Wake Me Up', artist: 'Avicii' },
    { id: 'LidokWL-AXk', title: 'Don\'t You Worry Child', artist: 'Swedish House Mafia' }
  ]
};

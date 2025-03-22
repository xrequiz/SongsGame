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
  mizrahit: [
    { id: 'bSnO_SUm0OQ', title: 'Shlomo Artzi - Ahavtiha', artist: 'Shlomo Artzi' },
    { id: 'k6Ux8jY9UBk', title: 'Eyal Golan - Ze Ani', artist: 'Eyal Golan' },
    { id: 'Z0m4bGZ7B9s', title: 'Sarit Hadad - Shema Israel', artist: 'Sarit Hadad' },
    { id: 'nMQw29nfzpg', title: 'Omer Adam - Tel Aviv', artist: 'Omer Adam' },
    { id: 'RpF6p_Hm_Do', title: 'Eden Ben Zaken - Malkat Hashoshanim', artist: 'Eden Ben Zaken' },
    { id: 'YZY4QGl1XN4', title: 'Moshe Peretz - Hashem Melech', artist: 'Moshe Peretz' },
    { id: 'YxZ5B-K5Vlo', title: 'Lior Narkis - Milim Yafot Me'eleh', artist: 'Lior Narkis' },
    { id: 'iP-86de-Nb4', title: 'Dudu Aharon - Shnei Meshugaim', artist: 'Dudu Aharon' },
    { id: 'vT-7bNH2uxM', title: 'Kobi Peretz - Nechmad', artist: 'Kobi Peretz' },
    { id: 'L7R-yBZ5QYc', title: 'Peer Tasi - Derech Hashalom', artist: 'Peer Tasi' }
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

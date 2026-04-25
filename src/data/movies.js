const movies = [
  {
    id: 1,
    title: "Inception",
    director: "Christopher Nolan",
    genre: "Sci-Fi",
    year: 2010,
    rating: 8.8,
    poster: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
    summary:
      "A skilled thief who enters people's dreams to steal secrets is offered a chance to have his criminal record erased if he can implant an idea into a target's subconscious.",
  },
  {
    id: 2,
    title: "The Dark Knight",
    director: "Christopher Nolan",
    genre: "Action",
    year: 2008,
    rating: 9.0,
    poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    summary:
      "Batman faces the Joker, a criminal mastermind who plunges Gotham City into anarchy, testing the hero's limits and the city's will to fight chaos.",
  },
  {
    id: 3,
    title: "Interstellar",
    director: "Christopher Nolan",
    genre: "Sci-Fi",
    year: 2014,
    rating: 8.6,
    poster: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    summary:
      "A team of astronauts travels through a wormhole near Saturn in search of a new home for humanity as Earth's resources rapidly dwindle.",
  },
  {
    id: 4,
    title: "The Godfather",
    director: "Francis Ford Coppola",
    genre: "Crime",
    year: 1972,
    rating: 9.2,
    poster: "https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsLLeHjmoTjz7.jpg",
    summary:
      "The aging patriarch of an organized crime dynasty transfers control of his empire to his reluctant son, who must navigate dangerous family rivalries.",
  },
  {
    id: 5,
    title: "Pulp Fiction",
    director: "Quentin Tarantino",
    genre: "Crime",
    year: 1994,
    rating: 8.9,
    poster: "https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
    summary:
      "The lives of two mob hitmen, a boxer, a gangster's wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
  },
  {
    id: 6,
    title: "The Matrix",
    director: "The Wachowskis",
    genre: "Sci-Fi",
    year: 1999,
    rating: 8.7,
    poster: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
    summary:
      "A computer hacker discovers that reality as he knows it is a simulation created by machines, and joins a rebellion to break free from the system.",
  },
  {
    id: 7,
    title: "Forrest Gump",
    director: "Robert Zemeckis",
    genre: "Drama",
    year: 1994,
    rating: 8.8,
    poster: "https://image.tmdb.org/t/p/w500/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg",
    summary:
      "The presidencies of Kennedy and Johnson, Vietnam, Watergate, and other events unfold through the perspective of an Alabama man with a low IQ.",
  },
  {
    id: 8,
    title: "The Shawshank Redemption",
    director: "Frank Darabont",
    genre: "Drama",
    year: 1994,
    rating: 9.3,
    poster: "https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
    summary:
      "Two imprisoned men bond over years, finding solace and redemption through acts of decency in the oppressive confines of Shawshank State Prison.",
  },
  {
    id: 9,
    title: "Parasite",
    director: "Bong Joon-ho",
    genre: "Thriller",
    year: 2019,
    rating: 8.5,
    poster: "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
    summary:
      "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
  },
  {
    id: 10,
    title: "Avengers: Endgame",
    director: "Russo Brothers",
    genre: "Action",
    year: 2019,
    rating: 8.4,
    poster: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
    summary:
      "After the devastating events of Infinity War, the Avengers assemble once more to reverse Thanos's actions and restore balance to the universe.",
  },
  {
    id: 11,
    title: "Whiplash",
    director: "Damien Chazelle",
    genre: "Drama",
    year: 2014,
    rating: 8.5,
    poster: "https://image.tmdb.org/t/p/w500/7fn624j5lj3xTme2SgiLCeuedmO.jpg",
    summary:
      "A promising young drummer enrolls at a cutthroat music conservatory where his drive to succeed is matched by an instructor who will stop at nothing to get a perfect performance.",
  },
  {
    id: 12,
    title: "The Lion King",
    director: "Roger Allers",
    genre: "Animation",
    year: 1994,
    rating: 8.5,
    poster: "https://image.tmdb.org/t/p/w500/sKCr78MXSLixwmZ8DyJLrpMsd15.jpg",
    summary:
      "Lion cub Simba idolizes his father King Mufasa but is manipulated into believing he is responsible for his death, forcing him into exile until he can reclaim his throne.",
  },
  {
    id: 13,
    title: "Get Out",
    director: "Jordan Peele",
    genre: "Horror",
    year: 2017,
    rating: 7.7,
    poster: "https://image.tmdb.org/t/p/w500/tFXcEccSQMf3lfhfXKSU9iRBpa3.jpg",
    summary:
      "A young Black man visits his white girlfriend's family estate, only to discover a disturbing secret that threatens his very existence.",
  },
  {
    id: 14,
    title: "Coco",
    director: "Lee Unkrich",
    genre: "Animation",
    year: 2017,
    rating: 8.4,
    poster: "https://image.tmdb.org/t/p/w500/gGEsBPAijhVUFoiNpgZXqRVWJt2.jpg",
    summary:
      "Aspiring musician Miguel journeys to the stunning and colorful Land of the Dead to find his great-great-grandfather and uncover the real story behind his family's ban on music.",
  },
  {
    id: 15,
    title: "Joker",
    director: "Todd Phillips",
    genre: "Thriller",
    year: 2019,
    rating: 8.4,
    poster: "https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg",
    summary:
      "Failed comedian Arthur Fleck descends into madness and becomes the iconic villain Joker after a series of brutal encounters with Gotham City's indifferent society.",
  },
  {
    id: 16,
    title: "Oppenheimer",
    director: "Christopher Nolan",
    genre: "Drama",
    year: 2023,
    rating: 8.3,
    poster: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
    summary:
      "The story of J. Robert Oppenheimer's role in the development of the atomic bomb during World War II and the consequences that haunted him afterward.",
  },
  {
    id: 17,
    title: "Dune",
    director: "Denis Villeneuve",
    genre: "Sci-Fi",
    year: 2021,
    rating: 8.0,
    poster: "https://image.tmdb.org/t/p/w500/d5NXSklpcKQEMd0DrErNcsdlN5s.jpg",
    summary:
      "Paul Atreides, a brilliant and gifted young man born into a great destiny, must travel to the most dangerous planet in the universe to ensure the future of his family and people.",
  },
  {
    id: 18,
    title: "Everything Everywhere All at Once",
    director: "Daniels",
    genre: "Sci-Fi",
    year: 2022,
    rating: 7.8,
    poster: "https://image.tmdb.org/t/p/w500/w3LxiVYdWWRvEVdn5RYq6jIqkb1.jpg",
    summary:
      "A middle-aged Chinese immigrant is swept up in an insane adventure to save the multiverse by connecting with parallel universe versions of herself.",
  },
  {
    id: 19,
    title: "Gladiator",
    director: "Ridley Scott",
    genre: "Action",
    year: 2000,
    rating: 8.5,
    poster: "https://image.tmdb.org/t/p/w500/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg",
    summary:
      "A betrayed Roman general becomes a gladiator and seeks vengeance against the corrupt emperor who murdered his family and stripped him of his command.",
  },
  {
    id: 20,
    title: "Spirited Away",
    director: "Hayao Miyazaki",
    genre: "Animation",
    year: 2001,
    rating: 8.6,
    poster: "https://image.tmdb.org/t/p/w500/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg",
    summary:
      "During her family's move to the suburbs, a sulky ten-year-old girl wanders into a world ruled by gods and monsters, where humans are changed into beasts.",
  },
];

export default movies;

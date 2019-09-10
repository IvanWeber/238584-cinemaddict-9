import {getNewRandomArrayFromArray} from './utils.js';
import FilmCard from './components/film-card.js';

export const getMock = () => {
  const commentsVariants = [
    `Interesting setting and a good cast`,
    `Booooooooooring`,
    `Very very old. Meh`,
    `Interesting setting and a good cast`,
    `Cool`,
  ];
  const genresVariants = [
    `Musical`,
    `Western`,
    `Drama`,
    `Comedy`,
    `Cartoon`,
  ];
  return {
    title: [
      `The Dance of Life`,
      `Sagebrush Trail`,
      `The Man with the Golden Arm`,
      `Santa Claus Conquers the Martians`,
      `Popeye the Sailor Meets Sindbad the Sailor`,
    ][Math.round(Math.random() * 4)],
    description: [
      `Burlesque comic Ralph "Skid" Johnson (Skelly), and specialty dancer Bonny Lee King (Carroll), end up together on a cold, rainy night at a tr…`,
      `Sentenced for a murder he did not commit, John Brant escapes from prison determined to find the real killer. By chance Brant's narrow escap…`,
      `Frankie Machine (Frank Sinatra) is released from the federal Narcotic Farm in Lexington, Kentucky with a set of drums and a new outlook on…`,
      `The Martians Momar ("Mom Martian") and Kimar ("King Martian") are worried that their children Girmar ("Girl Martian") and Bomar ("Boy Marti…`,
      `In this short, Sindbad the Sailor (presumably Bluto playing a "role") proclaims himself, in song, to be the greatest sailor, adventurer and…`,
    ][Math.round(Math.random() * 4)],
    rating: [
      `8.3`,
      `5.3`,
      `6.5`,
      `3.1`,
      `4.9`,
    ][Math.round(Math.random() * 4)],
    runTime: [
      `1h 59m`,
      `1h 30m`,
      `1h 10m`,
      `2h 10m`,
      `1h 15m`,
    ][Math.round(Math.random() * 4)],
    genres: getNewRandomArrayFromArray(genresVariants, 3),
    releaseDate: [
      `30 March 1945`,
      `12 June 1935`,
      `17 August 1923`,
      `29 November 1933`,
      `11 October 1951`,
    ][Math.round(Math.random() * 4)],
    releaseDateTimestamp: [
      1567551459,
      1567451459,
      1567351459,
      1567251459,
      1567151459,
    ][Math.round(Math.random() * 4)],
    comments: getNewRandomArrayFromArray(commentsVariants, 4),
    originalTitle: [
      `The Dance of Life`,
      `Sagebrush Trail`,
      `The Man with the Golden Arm`,
      `Santa Claus Conquers the Martians`,
      `Popeye the Sailor Meets Sindbad the Sailor`,
    ][Math.round(Math.random() * 4)],
    director: [
      `Anthony Mann`,
      `Quentin Tarantino`,
      `Ridley Scott`,
      `David Lynch`,
      `Martin Scorsese`,
    ][Math.round(Math.random() * 4)],
    writers: [
      `Anthony Mann, Quentin Tarantino`,
      `Quentin Tarantino, David Lynch`,
      `Ridley Scott, Martin Scorsese`,
      `David Lynch, Martin Scorsese`,
      `Martin Scorsese, David Lynch`,
    ][Math.round(Math.random() * 4)],
    actors: [
      `Julianne Moore, John Travolta`,
      `Anthony Hopkins, Robert De Niro`,
      `Samuel Leroy Jackson`,
      `John Travolta, Anthony Hopkins`,
      `Robert De Niro, Samuel Leroy Jackson`,
    ][Math.round(Math.random() * 4)],
    country: [
      `USA`,
      `Russia`,
      `USSR`,
      `Great Britain`,
      `France`,
    ][Math.round(Math.random() * 4)],
    ageRating: [
      `3+`,
      `7+`,
      `12+`,
      `16+`,
      `18+`,
    ][Math.round(Math.random() * 4)],
    isAddToWatchlist: [
      true,
      false
    ][Math.round(Math.random())],
    isAlreadyWatched: [
      true,
      false
    ][Math.round(Math.random())],
    isAddToFavorites: [
      true,
      false
    ][Math.round(Math.random())],
    imageSrc: [
      `./images/posters/the-great-flamarion.jpg`,
      `./images/posters/sagebrush-trail.jpg`,
      `./images/posters/santa-claus-conquers-the-martians.jpg`,
      `./images/posters/the-dance-of-life.jpg`,
      `./images/posters/the-man-with-the-golden-arm.jpg`,
    ][Math.round(Math.random() * 4)]
  };
};

// Получение массива фильмов

export const getFilmsMock = (numberOfFilmsInMainList) => {
  let filmsMock = [];
  for (let i = 0; i < numberOfFilmsInMainList; i++) {
    filmsMock[i] = getMock();
    filmsMock[i].id = i;
  }
  return filmsMock;
};

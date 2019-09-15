export const Position = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

export const NUMBER_OF_FILMS_IN_MAIN_LIST = 12;

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

// Другие вспомогательные функции
export const getNewRandomArrayFromArray = (array, upperLimitOfRandomQuantity) => {
  let newArray = [];
  const quantityOfElements = Math.round(Math.random() * upperLimitOfRandomQuantity);
  if (quantityOfElements !== 0) {
    for (let i = 0; i < quantityOfElements; i++) {
      const randomArrayIndex = Math.round(Math.random() * array.length);
      newArray[i] = array[randomArrayIndex];
      array.splice(randomArrayIndex, 1);
    }
  }
  return newArray;
};

// Кнопка Show more

export const initiateLoadMoreButton = (cardsWrap, cards, buttonLoadMore, cardsFeed) => {
  if (cards.length > cardsFeed) {
    for (let i = cardsFeed; i < cards.length; i++) {
      cards[i].classList.add(`visually-hidden`);
    }
  }

  const showNextCards = () => {
    const visuallyHiddenCards = document.querySelectorAll(`.film-card.visually-hidden`);
    if (visuallyHiddenCards.length > cardsFeed) {
      for (let k = 0; k < cardsFeed; k++) {
        visuallyHiddenCards[k].classList.remove(`visually-hidden`);
      }
    } else {
      for (let k = 0; k < visuallyHiddenCards.length; k++) {
        visuallyHiddenCards[k].classList.remove(`visually-hidden`);
      }
      buttonLoadMore.classList.add(`visually-hidden`);
    }
  };
  buttonLoadMore.addEventListener(`click`, showNextCards);
};

// export const getFilmsMockFromDomElementsCollection = (elementsCollection) => {
//   let filmsMock = [];
//   elementsCollection.forEach((card) => {
//     let mock = {
//       id: card.querySelector(`.film-card__id`).textContent,
//       title: card.querySelector(`.film-card__title`).textContent,
//       description: card.querySelector(`.film-card__description`).textContent,
//       rating: card.querySelector(`.film-card__rating`).textContent,
//       runTime: card.querySelector(`.film-card__runTime`).textContent,
//       genres: [
//         card.querySelector(`.film-genre-0`).textContent,
//         card.querySelector(`.film-genre-1`).textContent,
//         card.querySelector(`.film-genre-2`).textContent,
//       ],
//       releaseDate: card.querySelector(`.film-card__releaseDate`).textContent,
//       releaseDateTimestamp: card.querySelector(`.film-card__releaseDateTimestamp`).textContent,
//       comments: card.querySelector(`.film-card__comments`).textContent,
//       originalTitle: card.querySelector(`.film-card__originalTitle`).textContent,
//       director: card.querySelector(`.film-card__director`).textContent,
//       writers: card.querySelector(`.film-card__writers`).textContent,
//       actors: card.querySelector(`.film-card__actors`).textContent,
//       country: card.querySelector(`.film-card__country`).textContent,
//       ageRating: card.querySelector(`.film-card__ageRating`).textContent,
//       isAddToWatchlist: card.querySelector(`.film-card__isAddToWatchlist`).textContent,
//       isAlreadyWatched: card.querySelector(`.film-card__isAlreadyWatched`).textContent,
//       isAddToFavorites: card.querySelector(`.film-card__isAddToFavorites`).textContent,
//       imageSrc: card.querySelector(`.film-card__image`).textContent,
//     };
//     filmsMock.push(mock);
//   });
//   return filmsMock;
// };



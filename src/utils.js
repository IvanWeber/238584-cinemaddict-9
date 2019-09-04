import ShowMoreButton from './components/show-more-button.js';

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

// Рендер и анрендер для компонентов
export const render = (container, element, place) => {
  const el = element.cloneNode(true);
  switch (place) {
    case Position.AFTERBEGIN:
      container.prepend(el);
      break;
    case Position.BEFOREEND:
      container.appendChild(el);
      break;
    default:
      container.insertBefore(el, place);
      break;
  }
};

export const unrender = (element) => {
  if (element) {
    element.remove();
  }
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

// Сортировка фильмов

export const initiateSortFilmsButtons = (bodyElement, films) => {
  const sortButtonsElements = bodyElement.querySelectorAll(`.sort__button`);
  const sortByDefaultElement = sortButtonsElements[0];
  const sortByDateElement = sortButtonsElements[1];
  const sortByRatingElement = sortButtonsElements[2];
  const mainFilmListContainer = bodyElement.querySelectorAll(`.films-list__container`)[0];
  const filmsDefault = Object.assign({}, films);

  const initiateShowMoreButton = () => {
    const showMoreButtonObj = new ShowMoreButton();
    const cardsWrap = document.querySelector(`.films-list__container`);
    const cards = cardsWrap.querySelectorAll(`.film-card`);
    const buttonLoadMoreToBeDeleted = document.querySelector(`.films-list__show-more`);
    buttonLoadMoreToBeDeleted.remove();
    render(mainFilmListContainer, showMoreButtonObj.getElement(), Position.BEFOREEND);
    const buttonLoadMore = document.querySelector(`.films-list__show-more`);
    initiateLoadMoreButton(cardsWrap, cards, buttonLoadMore, 5);
  };

  const resetBacklight = () => {
    sortByDefaultElement.classList.remove(`sort__button--active`);
    sortByDateElement.classList.remove(`sort__button--active`);
    sortByRatingElement.classList.remove(`sort__button--active`);
  };

  const sortByDefaultElementClickHandler = () => {
    const filmCardElements = mainFilmListContainer.querySelectorAll(`.film-card`);
    filmCardElements.forEach((el) => {
      el.remove();
    });
    for (let i = 0; i < NUMBER_OF_FILMS_IN_MAIN_LIST; i++) {
      render(mainFilmListContainer, filmsDefault[i].getElement(), Position.BEFOREEND);
    }
    initiateShowMoreButton();
    resetBacklight();
    sortByDefaultElement.classList.add(`sort__button--active`);
  };
  const sortByDateElementClickHandler = () => {
    const filmCardElements = mainFilmListContainer.querySelectorAll(`.film-card`);
    filmCardElements.forEach((el) => {
      el.remove();
    });

    films.sort(function (a, b) {
      return b._releaseDateTimestamp - a._releaseDateTimestamp;
    });
    for (let i = 0; i < NUMBER_OF_FILMS_IN_MAIN_LIST; i++) {
      render(mainFilmListContainer, films[i].getElement(), Position.BEFOREEND);
    }
    initiateShowMoreButton();
    resetBacklight();
    sortByDateElement.classList.add(`sort__button--active`);
  };
  const sortByRatingElementClickHandler = () => {
    const filmCardElements = mainFilmListContainer.querySelectorAll(`.film-card`);
    filmCardElements.forEach((el) => {
      el.remove();
    });
    films.sort((a, b) => {
      return b._rating - a._rating;
    });
    for (let i = 0; i < NUMBER_OF_FILMS_IN_MAIN_LIST; i++) {
      render(mainFilmListContainer, films[i].getElement(), Position.BEFOREEND);
    }
    initiateShowMoreButton();
    resetBacklight();
    sortByRatingElement.classList.add(`sort__button--active`);
  };

  sortByDefaultElement.addEventListener(`click`, sortByDefaultElementClickHandler);
  sortByDateElement.addEventListener(`click`, sortByDateElementClickHandler);
  sortByRatingElement.addEventListener(`click`, sortByRatingElementClickHandler);
};

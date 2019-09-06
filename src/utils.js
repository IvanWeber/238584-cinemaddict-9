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



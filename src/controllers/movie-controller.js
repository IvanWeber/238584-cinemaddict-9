import {Position} from '../utils.js';
import FilmDetails from '../components/film-details.js';
import PageController from "./page-controller.js";

export default class MovieController {
  constructor(container, films) {
    this._container = container;
    this._films = films;
  }

  render(container, element, place) {
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
  }

  unrender(element) {
    if (element) {
      element.remove();
    }
  }

  onDataChange() {

  }

  onChangeView() {

  }

  init() {
    const siteBodyElement = this._container;
    // Инициализация событий открытия попапа по нажатию на карточку фильма и его закрытия по нажатию на кнопку закрытия
    const filmCards = siteBodyElement.querySelectorAll(`.film-card`);

    const initiatePopupOpenOnClickFilmCard = () => {
      filmCards.forEach((card) => {
        const cardClickHandler = (evt) => {
          const elementIndex = evt.currentTarget.querySelector(`.film-card__id`).textContent;
          const filmDetailsObj = new FilmDetails(this._films[elementIndex]);
          // Рендер скрытого попапа с детальной информацией о фильме
          const prevFilmDetailsElement = siteBodyElement.querySelector(`.film-details`);
          this.unrender(prevFilmDetailsElement);
          this.render(siteBodyElement, filmDetailsObj.getElement(), Position.BEFOREEND);
          const filmDetailsPopup = siteBodyElement.querySelector(`.film-details`);
          const closeButton = filmDetailsPopup.querySelector(`.film-details__close-btn`);
          const filmDetailsCommentInput = filmDetailsPopup.querySelector(`.film-details__comment-input`);
          initiatePopupCloseOnClickCloseButton(filmDetailsPopup, closeButton);
          initiatePopupCloseOnKeydownEsc(filmDetailsPopup);
          initiateStopEventPropagationOnKeydownEscOnCommentInput(filmDetailsCommentInput);
          filmDetailsPopup.classList.remove(`visually-hidden`);
        };
        card.addEventListener(`click`, cardClickHandler);
      });
    };


    const initiatePopupCloseOnClickCloseButton = (filmDetailsPopup, closeButton) => {
      const closeButtonClickHandler = () => {
        filmDetailsPopup.classList.add(`visually-hidden`);
      };
      closeButton.addEventListener(`click`, closeButtonClickHandler);
    };

    const initiatePopupCloseOnKeydownEsc = (filmDetailsPopup) => {
      const popupKeydownEscHandler = (evt) => {
        if (evt.keyCode === 27) {
          filmDetailsPopup.classList.add(`visually-hidden`);
        }
      };
      document.addEventListener(`keydown`, popupKeydownEscHandler);
    };

    const initiateStopEventPropagationOnKeydownEscOnCommentInput = (filmDetailsCommentInput) => {
      const commentInputKeydownEscHandler = (evt) => {
        if (evt.keyCode === 27) {
          evt.stopPropagation();
        }
      };
      filmDetailsCommentInput.addEventListener(`keydown`, commentInputKeydownEscHandler);
    };

    const pageControllerObj = new PageController();

    const initiateFilmCardControlButtons = () => {
      const addToWatchListElements = siteBodyElement.querySelectorAll(`.film-card__controls-item--add-to-watchlist`);
      const markAsWatchedElements = siteBodyElement.querySelectorAll(`.film-card__controls-item--mark-as-watched`);
      const markAsFavoriteElements = siteBodyElement.querySelectorAll(`.film-card__controls-item--favorite`);

      const controlClickHandler = (evt) => {
        console.log(this._films);
        const id = evt.target.parentNode.parentNode.querySelector(`.film-card__id`).textContent;
        switch (evt.currentTarget.classList[2]) {
          case `film-card__controls-item--add-to-watchlist`:
            if (evt.currentTarget.classList[3] === `selected-category`) {
              evt.stopPropagation();
              evt.currentTarget.classList.remove(`selected-category`);
              // this._films[id].isAddToWatchlist = false;
              pageControllerObj.onDataChange(this._films, id, `isAddToWatchlist`, false);
            } else {
              evt.stopPropagation();
              evt.currentTarget.classList.add(`selected-category`);
              pageControllerObj.onDataChange(this._films, id, `isAddToWatchlist`, true);
            }
            break;
          case `film-card__controls-item--mark-as-watched`:
            if (evt.currentTarget.classList[3] === `selected-category`) {
              evt.stopPropagation();
              evt.currentTarget.classList.remove(`selected-category`);
              pageControllerObj.onDataChange(this._films, id, `isAlreadyWatched`, false);
            } else {
              evt.stopPropagation();
              evt.currentTarget.classList.add(`selected-category`);
              pageControllerObj.onDataChange(this._films, id, `isAlreadyWatched`, true);
            }
            break;
          case `film-card__controls-item--favorite`:
            if (evt.currentTarget.classList[3] === `selected-category`) {
              evt.stopPropagation();
              evt.currentTarget.classList.remove(`selected-category`);
              pageControllerObj.onDataChange(this._films, id, `isAddToFavorites`, false);
            } else {
              evt.stopPropagation();
              evt.currentTarget.classList.add(`selected-category`);
              pageControllerObj.onDataChange(this._films, id, `isAddToFavorites`, true);
            }
            break;
        }
      };

      addToWatchListElements.forEach((el) => {
        el.addEventListener(`click`, controlClickHandler);
      });
      markAsWatchedElements.forEach((el) => {
        el.addEventListener(`click`, controlClickHandler);
      });
      markAsFavoriteElements.forEach((el) => {
        el.addEventListener(`click`, controlClickHandler);
      });
    };

    // const changeStyleOfControlsDependingOnStateOfObjects = () => {
    //
    // };

    initiateFilmCardControlButtons();
    initiatePopupOpenOnClickFilmCard();
  }
}

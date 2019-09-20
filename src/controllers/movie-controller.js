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
    let filmCards = siteBodyElement.querySelectorAll(`.film-card`);

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
          const filmDetailsControlInputs = filmDetailsPopup.querySelectorAll(`.film-details__control-input`);
          // Подсвечиваем контролы категорий
          if (card.querySelector(`.film-card__controls-item--add-to-watchlist`).classList[3] === `selected-category`) {
            this._films[card.querySelector(`.film-card__id`).textContent].isAddToWatchlist = true;
            filmDetailsControlInputs[0].checked = true;
          } else {
            this._films[card.querySelector(`.film-card__id`).textContent].isAddToWatchlist = false;
            filmDetailsControlInputs[0].checked = false;
          }
          if (card.querySelector(`.film-card__controls-item--mark-as-watched`).classList[3] === `selected-category`) {
            this._films[card.querySelector(`.film-card__id`).textContent].isAlreadyWatched = true;
            filmDetailsControlInputs[1].checked = true;
            filmDetailsPopup.querySelector(`.form-details__middle-container`).classList.remove(`visually-hidden`);
            const ratingValues = filmDetailsPopup.querySelectorAll(`.film-details__user-rating-input`);
            ratingValues.forEach((el) => {
              if (Number(this._films[elementIndex].userRating) === Number(el.value)) {
                el.checked = true;
              }
            });
          } else {
            this._films[card.querySelector(`.film-card__id`).textContent].isAlreadyWatched = false;
            filmDetailsControlInputs[1].checked = false;
          }
          if (card.querySelector(`.film-card__controls-item--favorite`).classList[3] === `selected-category`) {
            this._films[card.querySelector(`.film-card__id`).textContent].isAddToFavorites = true;
            filmDetailsControlInputs[2].checked = true;
          } else {
            this._films[card.querySelector(`.film-card__id`).textContent].isAddToFavorites = false;
            filmDetailsControlInputs[2].checked = false;
          }
          initiatePopupCloseOnClickCloseButton(filmDetailsPopup, closeButton);
          initiatePopupCloseOnKeydownEsc(filmDetailsPopup);
          initiateStopEventPropagationOnKeydownEscOnCommentInput(filmDetailsCommentInput);
          initiatePopupControls();
          initiateUserRatingInputs();
          initiateSmileInserting();
          filmDetailsPopup.classList.remove(`visually-hidden`);
        };
        card.addEventListener(`click`, cardClickHandler);
      });
    };

    const initiatePopupControls = () => {
      filmCards = siteBodyElement.querySelectorAll(`.film-card`);
      const filmDetailsPopup = siteBodyElement.querySelector(`.film-details`);
      const filmDetailsControlLabels = filmDetailsPopup.querySelectorAll(`.film-details__control-label`);
      const id = filmDetailsPopup.querySelector(`.film_id`).textContent;
      let targetFilmCard = null;
      filmCards.forEach((film) => {
        if (film.querySelector(`.film-card__id`).textContent === id) {
          targetFilmCard = film;
        }
      });
      const controlClickHandler = (evt) => {
        switch (evt.currentTarget.classList[1]) {
          case `film-details__control-label--watchlist`:
            if (targetFilmCard.querySelector(`.film-card__controls-item--add-to-watchlist`).classList[3] === `selected-category`) {
              targetFilmCard.querySelector(`.film-card__controls-item--add-to-watchlist`).classList.remove(`selected-category`);
              pageControllerObj.onDataChange(this._films, id, `isAddToWatchlist`, false);
            } else {
              targetFilmCard.querySelector(`.film-card__controls-item--add-to-watchlist`).classList.add(`selected-category`);
              pageControllerObj.onDataChange(this._films, id, `isAddToWatchlist`, true);
            }
            break;
          case `film-details__control-label--watched`:
            if (targetFilmCard.querySelector(`.film-card__controls-item--mark-as-watched`).classList[3] === `selected-category`) {
              targetFilmCard.querySelector(`.film-card__controls-item--mark-as-watched`).classList.remove(`selected-category`);
              pageControllerObj.onDataChange(this._films, id, `isAlreadyWatched`, false);
            } else {
              targetFilmCard.querySelector(`.film-card__controls-item--mark-as-watched`).classList.add(`selected-category`);
              pageControllerObj.onDataChange(this._films, id, `isAlreadyWatched`, true);
              filmDetailsPopup.querySelector(`.form-details__middle-container`).classList.remove(`visually-hidden`);
            }
            break;
          case `film-details__control-label--favorite`:
            if (targetFilmCard.querySelector(`.film-card__controls-item--favorite`).classList[3] === `selected-category`) {
              targetFilmCard.querySelector(`.film-card__controls-item--favorite`).classList.remove(`selected-category`);
              pageControllerObj.onDataChange(this._films, id, `isAddToFavorites`, false);
            } else {
              targetFilmCard.querySelector(`.film-card__controls-item--favorite`).classList.add(`selected-category`);
              pageControllerObj.onDataChange(this._films, id, `isAddToFavorites`, true);
            }
            break;
        }
      };
      filmDetailsControlLabels.forEach((control) => {
        control.addEventListener(`click`, controlClickHandler);
      });
    };

    const initiateUserRatingInputs = () => {
      const filmDetailsPopup = siteBodyElement.querySelector(`.film-details`);
      const id = filmDetailsPopup.querySelector(`.film_id`).textContent;
      const userRatingInputs = filmDetailsPopup.querySelectorAll(`.film-details__user-rating-input`);

      const userRatingInputClickHandler = (evt) => {
        this._films[id].userRating = evt.currentTarget.value;
      };

      userRatingInputs.forEach((input) => {
        input.addEventListener(`click`, userRatingInputClickHandler);
      });
    };

    const initiateSmileInserting = () => {
      const filmDetailsPopup = siteBodyElement.querySelector(`.film-details`);
      const smileBox = filmDetailsPopup.querySelector(`.film-details__add-emoji-label`);
      const smiles = filmDetailsPopup.querySelectorAll(`.film-details__emoji-label`);

      const smileClickHandler = (evt) => {
        const chosenSmile = evt.currentTarget.querySelector(`img`).cloneNode(true);
        if (smileBox.querySelector(`img`)) {
          smileBox.removeChild(smileBox.querySelector(`img`));
        }
        smileBox.appendChild(chosenSmile);
        smileBox.firstChild.height = 55;
        smileBox.firstChild.width = 55;
      };

      smiles.forEach((smile) => {
        smile.addEventListener(`click`, smileClickHandler);
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
        const id = evt.target.parentNode.parentNode.querySelector(`.film-card__id`).textContent;
        switch (evt.currentTarget.classList[2]) {
          case `film-card__controls-item--add-to-watchlist`:
            if (evt.currentTarget.classList[3] === `selected-category`) {
              evt.stopPropagation();
              evt.currentTarget.classList.remove(`selected-category`);
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

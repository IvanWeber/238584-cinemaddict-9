import {Position} from '../utils.js';
import FilmDetails from '../components/film-details.js';

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

    initiatePopupOpenOnClickFilmCard();
  }
}

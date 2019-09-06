import Search from '../components/search.js';
import Sort from '../components/sort.js';
import ShowMoreButton from '../components/show-more-button.js';
import {initiateLoadMoreButton, Position} from '../utils.js';
import {getMock} from '../data.js';
import Profile from '../components/profile.js';
import MainNavigation from '../components/main-navigation.js';
import FilmsContainer from '../components/films-container.js';
import FilmDetails from '../components/film-details.js';
import SearchNoResult from '../components/search-no-result.js';

export default class PageController {
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

  init() {
    const NUMBER_OF_FILMS_IN_MAIN_LIST = 12;
    const NUMBER_OF_FILMS_IN_EXTRA_LIST = 2;

    const sortObj = new Sort();
    const searchObj = new Search();
    const profileObj = new Profile();
    const mainNavObj = new MainNavigation();
    const filmsContainerObj = new FilmsContainer();
    const filmDetailsObj = new FilmDetails(getMock());
    const searchNoResultObj = new SearchNoResult();

    const filmsMock = this._films;

    const siteBodyElement = this._container;
    const siteHeaderElement = siteBodyElement.querySelector(`.header`);
    const siteMainElement = siteBodyElement.querySelector(`.main`);

    this.render(siteHeaderElement, searchObj.getElement(), Position.BEFOREEND);
    this.render(siteHeaderElement, profileObj.getElement(), Position.BEFOREEND);
    this.render(siteMainElement, mainNavObj.getElement(), Position.BEFOREEND);
    this.render(siteMainElement, sortObj.getElement(), Position.BEFOREEND);

    // Рендер контейнера для основного списка фильмов и двух дополнительных списков
    this.render(siteMainElement, filmsContainerObj.getElement(), Position.BEFOREEND);

    const siteFilmsMainContainerElement = siteBodyElement.querySelector(`.films-list`);
    const siteFilmsListElement = siteFilmsMainContainerElement.querySelector(`.films-list__container`);
    const siteFilmsExtraListElements = siteBodyElement.querySelectorAll(`.films-list--extra`);


    for (let i = 0; i < NUMBER_OF_FILMS_IN_MAIN_LIST; i++) {
      this.render(siteFilmsListElement, filmsMock[i].getElement(), Position.BEFOREEND);
    }

    for (let i = 0; i < NUMBER_OF_FILMS_IN_EXTRA_LIST; i++) {
      this.render(siteFilmsExtraListElements[0].querySelector(`.films-list__container`), filmsMock[i].getElement(), Position.BEFOREEND);
    }

    for (let i = 0; i < NUMBER_OF_FILMS_IN_EXTRA_LIST; i++) {
      this.render(siteFilmsExtraListElements[1].querySelector(`.films-list__container`), filmsMock[i].getElement(), Position.BEFOREEND);
    }

    // Рендер скрытого попапа с детальной информацией о фильме
    this.render(siteBodyElement, filmDetailsObj.getElement(), Position.BEFOREEND);

    // Инициализация событий открытия попапа по нажатию на карточку фильма и его закрытия по нажатию на кнопку закрытия
    const filmDetailsPopup = siteBodyElement.querySelector(`.film-details`);
    const filmCards = siteBodyElement.querySelectorAll(`.film-card`);
    const closeButton = filmDetailsPopup.querySelector(`.film-details__close-btn`);
    const filmDetailsCommentInput = filmDetailsPopup.querySelector(`.film-details__comment-input`);

    const initiatePopupOpenOnClickFilmCard = () => {
      filmCards.forEach((card) => {
        const cardClickHandler = () => {
          filmDetailsPopup.classList.remove(`visually-hidden`);
        };
        card.addEventListener(`click`, cardClickHandler);
      });
    };


    const initiatePopupCloseOnClickCloseButton = () => {
      const closeButtonClickHandler = () => {
        filmDetailsPopup.classList.add(`visually-hidden`);
      };
      closeButton.addEventListener(`click`, closeButtonClickHandler);
    };

    const initiatePopupCloseOnKeydownEsc = () => {
      const popupKeydownEscHandler = (evt) => {
        if (evt.keyCode === 27) {
          filmDetailsPopup.classList.add(`visually-hidden`);
        }
      };
      document.addEventListener(`keydown`, popupKeydownEscHandler);
    };

    const initiateStopEventPropagationOnKeydownEscOnCommentInput = () => {
      const commentInputKeydownEscHandler = (evt) => {
        if (evt.keyCode === 27) {
          evt.stopPropagation();
        }
      };
      filmDetailsCommentInput.addEventListener(`keydown`, commentInputKeydownEscHandler);
    };

    initiatePopupOpenOnClickFilmCard();
    initiatePopupCloseOnClickCloseButton();
    initiatePopupCloseOnKeydownEsc();
    initiateStopEventPropagationOnKeydownEscOnCommentInput();

    // Рендерим кнопку load more
    const showMoreButtonObj = new ShowMoreButton();
    this.render(siteFilmsMainContainerElement, showMoreButtonObj.getElement(), Position.BEFOREEND);
    const cardsWrap = document.querySelector(`.films-list__container`);
    const cards = cardsWrap.querySelectorAll(`.film-card`);
    const buttonLoadMore = document.querySelector(`.films-list__show-more`);
    initiateLoadMoreButton(cardsWrap, cards, buttonLoadMore, 5);

    // Если нет фильмов, отрисовываем соответствующую вёрстку
    const siteFooterElement = siteBodyElement.querySelector(`.footer`);

    const renderNoResultIfNoFilms = () => {
      if (siteMainElement.querySelectorAll(`.film-card`).length === 0) {
        this.unrender(siteMainElement);
        this.render(siteBodyElement, searchNoResultObj.getElement(), siteFooterElement);
      }
    };

    renderNoResultIfNoFilms();

    // Инициализация работы меню сортировки

    const initiateSortFilmsButtons = (bodyElement, films) => {
      const sortButtonsElements = bodyElement.querySelectorAll(`.sort__button`);
      const sortByDefaultElement = sortButtonsElements[0];
      const sortByDateElement = sortButtonsElements[1];
      const sortByRatingElement = sortButtonsElements[2];
      const mainFilmListContainer = bodyElement.querySelectorAll(`.films-list__container`)[0];
      const filmsDefault = Object.assign({}, films);

      const initiateShowMoreButton = () => {
        const showMoreButtonObjSort = new ShowMoreButton();
        const cardsWrapSort = document.querySelector(`.films-list__container`);
        const cardsSort = cardsWrapSort.querySelectorAll(`.film-card`);
        const buttonLoadMoreToBeDeleted = document.querySelector(`.films-list__show-more`);
        buttonLoadMoreToBeDeleted.remove();
        this.render(mainFilmListContainer, showMoreButtonObjSort.getElement(), Position.BEFOREEND);
        const buttonLoadMoreSort = document.querySelector(`.films-list__show-more`);
        initiateLoadMoreButton(cardsWrapSort, cardsSort, buttonLoadMoreSort, 5);
      };

      const resetBacklight = () => {
        sortByDefaultElement.classList.remove(`sort__button--active`);
        sortByDateElement.classList.remove(`sort__button--active`);
        sortByRatingElement.classList.remove(`sort__button--active`);
      };

      const sortElementClickHandler = (evt) => {
        const filmCardElements = mainFilmListContainer.querySelectorAll(`.film-card`);
        let collection = films;
        filmCardElements.forEach((el) => el.remove());
        switch (evt.target.dataset.sort) {
          case `date`:
            collection.sort((a, b) => b.getReleaseDateTimestamp() - a.getReleaseDateTimestamp());
            break;
          case `rating`:
            collection.sort((a, b) => b.getRating() - a.getRating());
            break;
          default:
            collection = filmsDefault;
        }
        for (let i = 0; i < NUMBER_OF_FILMS_IN_MAIN_LIST; i++) {
          this.render(mainFilmListContainer, collection[i].getElement(), Position.BEFOREEND);
        }
        initiateShowMoreButton();
        resetBacklight();
        evt.target.classList.add(`sort__button--active`);
      };

      sortByDefaultElement.addEventListener(`click`, sortElementClickHandler);
      sortByDateElement.addEventListener(`click`, sortElementClickHandler);
      sortByRatingElement.addEventListener(`click`, sortElementClickHandler);
    };

    initiateSortFilmsButtons(this._container, this._films);
  }
}

import Search from '../components/search.js';
import Sort from '../components/sort.js';
import ShowMoreButton from '../components/show-more-button.js';
import {initiateLoadMoreButton, Position} from '../utils.js';
import Profile from '../components/profile.js';
import MainNavigation from '../components/main-navigation.js';
import FilmsContainer from '../components/films-container.js';
import SearchNoResult from '../components/search-no-result.js';
import FilmCard from '../components/film-card.js';

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
      let filmCardObj = new FilmCard(filmsMock[i]);
      this.render(siteFilmsListElement, filmCardObj.getElement(), Position.BEFOREEND);
    }

    for (let i = 0; i < NUMBER_OF_FILMS_IN_EXTRA_LIST; i++) {
      let filmCardObj = new FilmCard(filmsMock[i]);
      this.render(siteFilmsExtraListElements[0].querySelector(`.films-list__container`), filmCardObj.getElement(), Position.BEFOREEND);
    }

    for (let i = 0; i < NUMBER_OF_FILMS_IN_EXTRA_LIST; i++) {
      let filmCardObj = new FilmCard(filmsMock[i]);
      this.render(siteFilmsExtraListElements[1].querySelector(`.films-list__container`), filmCardObj.getElement(), Position.BEFOREEND);
    }

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

    // Инициализация функции открытия попапа по нажатию на карточку фильма

    const initiatePopupOpenOnClickFilmCard = (filmCards, filmDetailsPopup) => {
      filmCards.forEach((card) => {
        const cardClickHandler = () => {
          filmDetailsPopup.classList.remove(`visually-hidden`);
        };
        card.addEventListener(`click`, cardClickHandler);
      });
    };
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
            collection.sort((a, b) => b.releaseDateTimestamp - a.releaseDateTimestamp);
            break;
          case `rating`:
            collection.sort((a, b) => b.rating - a.rating);
            break;
          default:
            collection = filmsDefault;
        }
        for (let i = 0; i < NUMBER_OF_FILMS_IN_MAIN_LIST; i++) {
          let filmCardObj = new FilmCard(collection[i]);
          this.render(mainFilmListContainer, filmCardObj.getElement(), Position.BEFOREEND);
        }
        initiateShowMoreButton();
        resetBacklight();
        evt.target.classList.add(`sort__button--active`);
        // Инициализация событий открытия попапа по нажатию на карточку фильма
        const filmCardElementsAfter = siteBodyElement.querySelectorAll(`.film-card`);
        const filmDetailsPopupElement = siteBodyElement.querySelector(`.film-details`);
        initiatePopupOpenOnClickFilmCard(filmCardElementsAfter, filmDetailsPopupElement);
      };

      sortByDefaultElement.addEventListener(`click`, sortElementClickHandler);
      sortByDateElement.addEventListener(`click`, sortElementClickHandler);
      sortByRatingElement.addEventListener(`click`, sortElementClickHandler);
    };

    initiateSortFilmsButtons(this._container, this._films);
  }
}

import Search from '../components/search.js';
import Sort from '../components/sort.js';
import ShowMoreButton from '../components/show-more-button.js';
import {render, unrender, initiateLoadMoreButton, Position} from '../utils.js';
import {getMock} from '../data.js';
import Profile from '../components/profile.js';
import MainNavigation from '../components/main-navigation.js';
import FilmsContainer from '../components/films-container.js';
import FilmCard from '../components/film-card.js';
import FilmDetails from '../components/film-details.js';
import SearchNoResult from '../components/search-no-result.js';

export default class PageController {
  constructor(container, films) {
    this._container = container;
    this._films = films;
  }

  init() {
    const NUMBER_OF_FILMS_IN_MAIN_LIST = 12;
    const NUMBER_OF_FILMS_IN_EXTRA_LIST = 2;

    const sortObj = new Sort();
    const showMoreButtonObj = new ShowMoreButton();
    const searchObj = new Search();
    const profileObj = new Profile();
    const mainNavObj = new MainNavigation();
    const filmsContainerObj = new FilmsContainer();
    const filmDetailsObj = new FilmDetails(getMock());
    const searchNoResultObj = new SearchNoResult();

    const getFilmsMock = () => {
      let filmsMock = [];
      for (let i = 0; i < NUMBER_OF_FILMS_IN_MAIN_LIST; i++) {
        filmsMock[i] = new FilmCard(getMock());
      }
      return filmsMock;
    };

    const filmsMock = getFilmsMock();

    const siteBodyElement = document.querySelector(`body`);
    const siteHeaderElement = siteBodyElement.querySelector(`.header`);
    const siteMainElement = siteBodyElement.querySelector(`.main`);

    render(siteHeaderElement, searchObj.getElement(), Position.BEFOREEND);
    render(siteHeaderElement, profileObj.getElement(), Position.BEFOREEND);
    render(siteMainElement, mainNavObj.getElement(), Position.BEFOREEND);
    render(siteMainElement, sortObj.getElement(), Position.BEFOREEND);

    // Рендер контейнера для основного списка фильмов и двух дополнительных списков
    render(siteMainElement, filmsContainerObj.getElement(), Position.BEFOREEND);

    const siteFilmsMainContainerElement = siteBodyElement.querySelector(`.films-list`);
    const siteFilmsListElement = siteFilmsMainContainerElement.querySelector(`.films-list__container`);
    const siteFilmsExtraListElements = siteBodyElement.querySelectorAll(`.films-list--extra`);


    for (let i = 0; i < NUMBER_OF_FILMS_IN_MAIN_LIST; i++) {
      render(siteFilmsListElement, filmsMock[i].getElement(), Position.BEFOREEND);
    }

    for (let i = 0; i < NUMBER_OF_FILMS_IN_EXTRA_LIST; i++) {
      render(siteFilmsExtraListElements[0].querySelector(`.films-list__container`), filmsMock[i].getElement(), Position.BEFOREEND);
    }

    for (let i = 0; i < NUMBER_OF_FILMS_IN_EXTRA_LIST; i++) {
      render(siteFilmsExtraListElements[1].querySelector(`.films-list__container`), filmsMock[i].getElement(), Position.BEFOREEND);
    }

    // Рендер скрытого попапа с детальной информацией о фильме
    render(siteBodyElement, filmDetailsObj.getElement(), Position.BEFOREEND);

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
    render(siteFilmsMainContainerElement, showMoreButtonObj.getElement(), Position.BEFOREEND);
    const cardsWrap = document.querySelector(`.films-list__container`);
    const cards = cardsWrap.querySelectorAll(`.film-card`);
    const buttonLoadMore = document.querySelector(`.films-list__show-more`);
    // const loadMoreButton = new LoadMore(cardsWrap, cards, buttonLoadMore, 5);
    // loadMoreButton.initiateLoadMoreButton();
    initiateLoadMoreButton(cardsWrap, cards, buttonLoadMore, 5);

    // Если нет фильмов, отрисовываем соответствующую вёрстку
    const siteFooterElement = siteBodyElement.querySelector(`.footer`);

    const renderNoResultIfNoFilms = () => {
      if (siteMainElement.querySelectorAll(`.film-card`).length === 0) {
        unrender(siteMainElement);
        render(siteBodyElement, searchNoResultObj.getElement(), siteFooterElement);
      }
    };

    renderNoResultIfNoFilms();
  }
}

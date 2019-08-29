import Search from './components/search.js';
import Sort from './components/sort.js';
import ShowMoreButton from './components/show-more-button.js';
import {Position} from './utils.js';
import {render} from './utils.js';
// import {unrender} from './utils.js';
import {getMock} from './data.js';
import Profile from './components/profile.js';
import MainNavigation from './components/main-navigation.js';
import FilmsContainer from './components/films-container.js';
import Film from './components/film.js';
import LoadMore from './components/load-more.js';

const NUMBER_OF_FILMS_IN_MAIN_LIST = 12;
const NUMBER_OF_FILMS_IN_EXTRA_LIST = 2;

const sortObj = new Sort();
const showMoreButtonObj = new ShowMoreButton();
const searchObj = new Search();
const profileObj = new Profile();
const mainNavObj = new MainNavigation();
const filmsContainerObj = new FilmsContainer();

const getFilmsMock = () => {
  let filmsMock = [];
  for (let i = 0; i < NUMBER_OF_FILMS_IN_MAIN_LIST; i++) {
    filmsMock[i] = new Film(getMock());
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
  render(siteFilmsListElement, filmsMock[i].getElementFilmCard(), Position.BEFOREEND);
}

for (let i = 0; i < NUMBER_OF_FILMS_IN_EXTRA_LIST; i++) {
  render(siteFilmsExtraListElements[0].querySelector(`.films-list__container`), filmsMock[i].getElementFilmCard(), Position.BEFOREEND);
}

for (let i = 0; i < NUMBER_OF_FILMS_IN_EXTRA_LIST; i++) {
  render(siteFilmsExtraListElements[1].querySelector(`.films-list__container`), filmsMock[i].getElementFilmCard(), Position.BEFOREEND);
}

// Рендер скрытого попапа с детальной информацией о фильме
render(siteBodyElement, filmsMock[0].getElementFilmDetails(), Position.BEFOREEND);

// Инициализация событий открытия попапа по нажатию на карточку фильма и его закрытия по нажатию на кнопку закрытия
const initiatePopupOpenOnClickFilmCard = () => {
  const filmDetailsPopup = siteBodyElement.querySelector(`.film-details`);
  const filmCards = siteBodyElement.querySelectorAll(`.film-card`);
  filmCards.forEach((card) => {
    const cardClickHandler = () => {
      filmDetailsPopup.classList.remove(`visually-hidden`);
    };
    card.addEventListener(`click`, cardClickHandler);
  });
};


const initiatePopupCloseOnClickCloseButton = () => {
  const filmDetailsPopup = siteBodyElement.querySelector(`.film-details`);
  const closeButton = filmDetailsPopup.querySelector(`.film-details__close-btn`);
  const closeButtonClickHandler = () => {
    filmDetailsPopup.classList.add(`visually-hidden`);
  };
  closeButton.addEventListener(`click`, closeButtonClickHandler);
};

initiatePopupOpenOnClickFilmCard();
initiatePopupCloseOnClickCloseButton();

// Рендерим кнопку load more
render(siteFilmsMainContainerElement, showMoreButtonObj.getElement(), Position.BEFOREEND);
const cardsWrap = document.querySelector(`.films-list__container`);
const cards = cardsWrap.querySelectorAll(`.film-card`);
const buttonLoadMore = document.querySelector(`.films-list__show-more`);
const loadMoreButton = new LoadMore(cardsWrap, cards, buttonLoadMore, 5);
loadMoreButton.initiateLoadMoreButton();

import {createSearchTemplate} from './components/search.js';
import {createProfileTemplate} from './components/profile.js';
import {createMainNavigationTemplate} from './components/main-navigation.js';
import {createSortTemplate} from './components/sort.js';
import {createFilmContainerTemplate} from './components/films-container.js';
import {createFilmDetailsTemplate} from './components/film-details.js';
import {createShowMoreButtonTemplate} from './components/show-more-button.js';
import {Position} from './utils.js';
import {createElement} from './utils.js';
import {FilmCard} from './components/film-card.js';
import {LoadMore} from './components/load-more.js';

const NUMBER_OF_FILMS_IN_MAIN_LIST = 12;
const NUMBER_OF_FILMS_IN_EXTRA_LIST = 2;

const filmObject = new FilmCard(`The Dance of Life`, `Burlesque comic Ralph "Skid" Johnson (Skelly), and specialty dancer Bonny Lee King (Carroll), end up together on a cold, rainy night at a tr…`, `8.3`, `1h 55m`, `Musical`, `1929 `, [`ohhh`, `awesome`, `bad movie`], `./images/posters/the-dance-of-life.jpg`);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteBodyElement = document.querySelector(`body`);
const siteHeaderElement = siteBodyElement.querySelector(`.header`);
const siteMainElement = siteBodyElement.querySelector(`.main`);

render(siteHeaderElement, createSearchTemplate(), Position.BEFOREEND);
render(siteHeaderElement, createProfileTemplate(), Position.BEFOREEND);
render(siteMainElement, createMainNavigationTemplate(), Position.BEFOREEND);
render(siteMainElement, createSortTemplate(), Position.BEFOREEND);

// Рендер контейнера для основного списка фильмов и двух дополнительных списков
render(siteMainElement, createFilmContainerTemplate(), Position.BEFOREEND);

const siteFilmsMainContainerElement = siteBodyElement.querySelector(`.films-list`);
const siteFilmsListElement = siteFilmsMainContainerElement.querySelector(`.films-list__container`);
const siteFilmsExtraListElements = siteBodyElement.querySelectorAll(`.films-list--extra`);


for (let i = 1; i <= NUMBER_OF_FILMS_IN_MAIN_LIST; i++) {
  render(siteFilmsListElement, filmObject.getTemplate(), Position.BEFOREEND);
}

for (let i = 1; i <= NUMBER_OF_FILMS_IN_EXTRA_LIST; i++) {
  render(siteFilmsExtraListElements[0].querySelector(`.films-list__container`), filmObject.getTemplate(), Position.BEFOREEND);
}

for (let i = 1; i <= NUMBER_OF_FILMS_IN_EXTRA_LIST; i++) {
  render(siteFilmsExtraListElements[1].querySelector(`.films-list__container`), filmObject.getTemplate(), Position.BEFOREEND);
}

// Рендер скрытого попапа с детальной информацией о фильме
render(siteBodyElement, createFilmDetailsTemplate(), Position.BEFOREEND);

// Рендерим кнопку load more
render(siteFilmsMainContainerElement, createShowMoreButtonTemplate(), Position.BEFOREEND);
const cardsWrap = document.querySelector(`.films-list__container`);
const cards = cardsWrap.querySelectorAll(`.film-card`);
const buttonLoadMore = document.querySelector(`.films-list__show-more`);
const loadMoreButton = new LoadMore(cardsWrap, cards, buttonLoadMore, 5);
loadMoreButton.initiateLoadMoreButton();

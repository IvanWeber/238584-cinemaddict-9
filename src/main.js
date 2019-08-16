import {createSearchTemplate} from './components/search.js';
import {createProfileTemplate} from './components/profile.js';
import {createMainNavigationTemplate} from './components/main-navigation.js';
import {createSortTemplate} from './components/sort.js';
import {createFilmContainerTemplate} from './components/films-container.js';
import {createFilmDetailsTemplate} from './components/film-details.js';
import {createShowMoreButtonTemplate} from './components/show-more-button.js';
import {createFilmCardTemplate} from './components/film-card.js';

const NUMBER_OF_FILMS_IN_MAIN_LIST = 5;
const NUMBER_OF_FILMS_IN_EXTRA_LIST = 2;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteBodyElement = document.querySelector(`body`);
const siteHeaderElement = siteBodyElement.querySelector(`.header`);
const siteMainElement = siteBodyElement.querySelector(`.main`);

render(siteHeaderElement, createSearchTemplate(), `beforeend`);
render(siteHeaderElement, createProfileTemplate(), `beforeend`);
render(siteMainElement, createMainNavigationTemplate(), `beforeend`);
render(siteMainElement, createSortTemplate(), `beforeend`);

// Рендер контейнера для основного списка фильмов и двух дополнительных списков
render(siteMainElement, createFilmContainerTemplate(), `beforeend`);

const siteFilmsMainContainerElement = siteBodyElement.querySelector(`.films-list`);
const siteFilmsListElement = siteFilmsMainContainerElement.querySelector(`.films-list__container`);
const siteFilmsExtraListElements = siteBodyElement.querySelectorAll(`.films-list--extra`);

render(siteFilmsMainContainerElement, createShowMoreButtonTemplate(), `beforeend`);

for (let i = 1; i <= NUMBER_OF_FILMS_IN_MAIN_LIST; i++) {
  render(siteFilmsListElement, createFilmCardTemplate(), `beforeend`);
}

for (let i = 1; i <= NUMBER_OF_FILMS_IN_EXTRA_LIST; i++) {
  render(siteFilmsExtraListElements[0].querySelector(`.films-list__container`), createFilmCardTemplate(), `beforeend`);
}

for (let i = 1; i <= NUMBER_OF_FILMS_IN_EXTRA_LIST; i++) {
  render(siteFilmsExtraListElements[1].querySelector(`.films-list__container`), createFilmCardTemplate(), `beforeend`);
}

// Рендер скрытого попапа с детальной информацией о фильме
render(siteBodyElement, createFilmDetailsTemplate(), `beforeend`);

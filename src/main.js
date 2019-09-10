import PageController from './controllers/page-controller.js';
import MovieController from './controllers/movie-controller.js';
import {getFilmsMock} from './data.js';
import {NUMBER_OF_FILMS_IN_MAIN_LIST} from './utils.js';

const pageController = new PageController(document.querySelector(`body`), getFilmsMock(NUMBER_OF_FILMS_IN_MAIN_LIST));
const movieController = new MovieController(document.querySelector(`body`));

pageController.init();
movieController.init();

import PageController from './controllers/page-controller.js';
import {getFilmsMock} from './data.js';

const NUMBER_OF_FILMS_IN_MAIN_LIST = 12;

const pageController = new PageController(document.querySelector(`body`), getFilmsMock(NUMBER_OF_FILMS_IN_MAIN_LIST));

pageController.init();

import ShowMoreButton from './components/show-more-button.js';
import PageController from './controllers/page-controller.js';
import {getFilmsMock} from './data.js';
import {NUMBER_OF_FILMS_IN_MAIN_LIST} from './utils.js';

const pageController = new PageController(document.querySelector(`body`), getFilmsMock(NUMBER_OF_FILMS_IN_MAIN_LIST));

pageController.init();

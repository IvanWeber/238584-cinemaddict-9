import AbstractComponent from './abstract-component.js';

export default class FilmCard extends AbstractComponent {
  constructor(args) {
    super();
    this._title = args.title;
    this._description = args.description;
    this._rating = args.rating;
    this._userRating = args._userRating;
    this._runTime = args.runTime;
    this._genres = args.genres;
    this._releaseDate = args.releaseDate;
    this._releaseDateTimestamp = args.releaseDateTimestamp;
    this._comments = args.comments;
    this._originalTitle = args.originalTitle;
    this._director = args.director;
    this._writers = args.writers;
    this._actors = args.actors;
    this._country = args.country;
    this._ageRating = args.ageRating;
    this._isAddToWatchlist = args.isAddToWatchlist;
    this._isAlreadyWatched = args.isAlreadyWatched;
    this._isAddToFavorites = args.isAddToFavorites;
    this._image = args.imageSrc;
    this._id = args.id;
  }

  getRating() {
    return this._rating;
  }

  getReleaseDateTimestamp() {
    return this._releaseDateTimestamp;
  }

  getTemplate() {
    let isAddToWatchlist = ``;
    if (this._isAddToWatchlist) {
      isAddToWatchlist = `selected-category`;
    }
    let isAlreadyWatched = ``;
    if (this._isAlreadyWatched) {
      isAlreadyWatched = `selected-category`;
    }
    let isAddToFavorites = ``;
    if (this._isAddToFavorites) {
      isAddToFavorites = `selected-category`;
    }
    return `<article class="film-card">
          <h3 class="film-card__title">${this._title}</h3>
          <p class="film-card__originalTitle visually-hidden">${this._originalTitle}</p>
          <p class="film-card__director visually-hidden">${this._director}</p>
          <p class="film-card__writers visually-hidden">${this._writers}</p>
          <p class="film-card__actors visually-hidden">${this._actors}</p>
          <p class="film-card__country visually-hidden">${this._country}</p>
          <p class="film-card__ageRating visually-hidden">${this._ageRating}</p>
          <p class="film-card__isAddToWatchlist visually-hidden">${this._isAddToWatchlist}</p>
          <p class="film-card__isAlreadyWatched visually-hidden">${this._isAlreadyWatched}</p>
          <p class="film-card__isAddToFavorites visually-hidden ${isAddToFavorites}">${this._isAddToFavorites}</p>
          <p class="film-card__releaseDateTimestamp visually-hidden">${this._releaseDateTimestamp}</p>
          <p class="film-card__image visually-hidden">${this._image}</p>
          <p class="film-card__id visually-hidden">${this._id}</p>
          <p class="film-genre-0 visually-hidden">${this._genres[0]}</p>
          <p class="film-genre-1 visually-hidden">${this._genres[1]}</p>
          <p class="film-genre-2 visually-hidden">${this._genres[2]}</p>
          <p class="film-card__rating">${this._rating}</p>
          <p class="film-card__info">
            <span class="film-card__releaseDate">${this._releaseDate}</span>
            <span class="film-card__runTime">${this._runTime}</span>
            <span class="film-card__genres">${this._genres[0]}</span>
          </p>
          <img src="${this._image}" alt="" class="film-card__poster">
          <p class="film-card__description">${this._description}</p>
          <a class="film-card__comments">${this._comments.length} Comments</a>
          <form class="film-card__controls">
            <button type="button" class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${isAddToWatchlist}">Add to watchlist</button>
            <button type="button" class="film-card__controls-item button film-card__controls-item--mark-as-watched ${isAlreadyWatched}">Mark as watched</button>
            <button type="button" class="film-card__controls-item button film-card__controls-item--favorite ${isAddToFavorites}">Mark as favorite</button>
          </form>
        </article>`;
  }
}

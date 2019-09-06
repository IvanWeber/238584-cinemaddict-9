import AbstractComponent from './abstract-component.js';

export default class FilmCard extends AbstractComponent {
  constructor(args) {
    super();
    this._title = args.title;
    this._description = args.description;
    this._rating = args.rating;
    this._runTime = args.runTime;
    this._genres = args.genres;
    this._releaseDate = args.releaseDate;
    this._releaseDateTimestamp = args.releaseDateTimestamp;
    this._comments = args.comments;
    this._isAddToWatchlist = args.isAddToWatchlist;
    this._isAlreadyWatched = args.isAlreadyWatched;
    this._isAddToFavorites = args.isAddToFavorites;
    this._image = args.imageSrc;
  }

  getRating() {
    return this._rating;
  }

  getReleaseDateTimestamp() {
    return this._releaseDateTimestamp;
  }

  getTemplate() {
    return `<article class="film-card">
          <h3 class="film-card__title">${this._title}</h3>
          <p class="film-card__rating">${this._rating}</p>
          <p class="film-card__info">
            <span class="film-card__year">${this._releaseDate}</span>
            <span class="film-card__duration">${this._runTime}</span>
            <span class="film-card__genre">${this._genres[0]}</span>
          </p>
          <img src="${this._image}" alt="" class="film-card__poster">
          <p class="film-card__description">${this._description}</p>
          <a class="film-card__comments">${this._comments.length} Comments</a>
          <form class="film-card__controls">
            <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
            <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
            <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
          </form>
        </article>`;
  }
}

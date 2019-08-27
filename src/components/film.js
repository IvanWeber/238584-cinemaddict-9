import {createElement} from '../utils.js';
import {getNewRandomArrayFromArray} from '../utils.js';

export class Film {
  constructor(title, description, rating, runTime, genres, releaseDate, comments, originalTitle, director, writers, actors, country, ageRating, isAddToWatchlist, isAlreadyWatched, isAddToFavorites, imageSrc) {
    this._title = title;
    this._description = description;
    this._rating = rating;
    this._runTime = runTime;
    this._genres = genres;
    this._releaseDate = releaseDate;
    this._comments = comments;
    this._originalTitle = originalTitle;
    this._director = director;
    this._writers = writers;
    this._actors = actors;
    this._country = country;
    this._ageRating = ageRating;
    this._isAddToWatchlist = isAddToWatchlist;
    this._isAlreadyWatched = isAlreadyWatched;
    this._isAddToFavorites = isAddToFavorites;
    this._image = imageSrc;
    this._elementFilmCard = null;
    this._elementFilmDetail = null;
  }

  static getMock() {
    const commentsVariants = [
      `Interesting setting and a good cast`,
      `Booooooooooring`,
      `Very very old. Meh`,
      `Interesting setting and a good cast`,
      `Cool`,
    ];
    const genresVariants = [
      `Musical`,
      `Western`,
      `Drama`,
      `Comedy`,
      `Cartoon`,
    ];
    return {
      title: [
        `The Dance of Life`,
        `Sagebrush Trail`,
        `The Man with the Golden Arm`,
        `Santa Claus Conquers the Martians`,
        `Popeye the Sailor Meets Sindbad the Sailor`,
      ][Math.round(Math.random() * 4)],
      description: [
        `Burlesque comic Ralph "Skid" Johnson (Skelly), and specialty dancer Bonny Lee King (Carroll), end up together on a cold, rainy night at a tr…`,
        `Sentenced for a murder he did not commit, John Brant escapes from prison determined to find the real killer. By chance Brant's narrow escap…`,
        `Frankie Machine (Frank Sinatra) is released from the federal Narcotic Farm in Lexington, Kentucky with a set of drums and a new outlook on…`,
        `The Martians Momar ("Mom Martian") and Kimar ("King Martian") are worried that their children Girmar ("Girl Martian") and Bomar ("Boy Marti…`,
        `In this short, Sindbad the Sailor (presumably Bluto playing a "role") proclaims himself, in song, to be the greatest sailor, adventurer and…`,
      ][Math.round(Math.random() * 4)],
      rating: [
        `8.3`,
        `5.3`,
        `6.5`,
        `3.1`,
        `4.9`,
      ][Math.round(Math.random() * 4)],
      runTime: [
        `1h 59m`,
        `1h 30m`,
        `1h 10m`,
        `2h 10m`,
        `1h 15m`,
      ][Math.round(Math.random() * 4)],
      genres: getNewRandomArrayFromArray(genresVariants, 3),
      releaseDate: [
        `30 March 1945`,
        `12 June 1935`,
        `17 August 1923`,
        `29 November 1933`,
        `11 October 1951`,
      ][Math.round(Math.random() * 4)],
      comments: getNewRandomArrayFromArray(commentsVariants, 4),
      originalTitle: [
        `The Dance of Life`,
        `Sagebrush Trail`,
        `The Man with the Golden Arm`,
        `Santa Claus Conquers the Martians`,
        `Popeye the Sailor Meets Sindbad the Sailor`,
      ][Math.round(Math.random() * 4)],
      director: [
        `Anthony Mann`,
        `Quentin Tarantino`,
        `Ridley Scott`,
        `David Lynch`,
        `Martin Scorsese`,
      ][Math.round(Math.random() * 4)],
      writers: [
        `Anthony Mann, Quentin Tarantino`,
        `Quentin Tarantino, David Lynch`,
        `Ridley Scott, Martin Scorsese`,
        `David Lynch, Martin Scorsese`,
        `Martin Scorsese, David Lynch`,
      ][Math.round(Math.random() * 4)],
      actors: [
        `Julianne Moore, John Travolta`,
        `Anthony Hopkins, Robert De Niro`,
        `Samuel Leroy Jackson`,
        `John Travolta, Anthony Hopkins`,
        `Robert De Niro, Samuel Leroy Jackson`,
      ][Math.round(Math.random() * 4)],
      country: [
        `USA`,
        `Russia`,
        `USSR`,
        `Great Britain`,
        `France`,
      ][Math.round(Math.random() * 4)],
      ageRating: [
        `3+`,
        `7+`,
        `12+`,
        `16+`,
        `18+`,
      ][Math.round(Math.random() * 4)],
      isAddToWatchlist: [
        true,
        false
      ][Math.round(Math.random())],
      isAlreadyWatched: [
        true,
        false
      ][Math.round(Math.random())],
      isAddToFavorites: [
        true,
        false
      ][Math.round(Math.random())],
      image: [
        `./images/posters/the-great-flamarion.jpg`,
        `./images/posters/sagebrush-trail.jpg`,
        `./images/posters/santa-claus-conquers-the-martians.jpg`,
        `./images/posters/the-dance-of-life.jpg`,
        `./images/posters/the-man-with-the-golden-arm.jpg`,
      ][Math.round(Math.random() * 4)]
    };
  }

  getElementFilmCard() {
    if (!this._elementFilmCard) {
      this._elementFilmCard = createElement(this.getTemplateFilmCard());
    }

    return this._elementFilmCard;
  }

  removeElementFilmCard() {
    this._elementFilmCard = null;
  }

  getTemplateFilmCard() {
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

  getElementFilmDetails() {
    if (!this._elementFilmDetail) {
      this._elementFilmDetail = createElement(this.getTemplateFilmDetails());
    }

    return this._elementFilmDetail;
  }

  removeElementFilmDetails() {
    this._elementFilmDetail = null;
  }

  getTemplateFilmDetails() {
    const getGenresElement = () => {
      let genresElement = ``;
      this._genres.forEach((genre) => {
        genresElement += `<span class="film-details__genre">${genre}</span>`;
      });
      return genresElement;
    };
    return `<section class="film-details visually-hidden">
  <form class="film-details__inner" action="" method="get">
    <div class="form-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="${this._image}" alt="">

          <p class="film-details__age">${this._ageRating}</p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${this._title}</h3>
              <p class="film-details__title-original">Original: ${this._originalTitle}</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${this._rating}</p>
            </div>
          </div>

          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${this._director}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${this._writers}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${this._actors}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${this._releaseDate}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${this._runTime}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${this._country}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Genres</td>
              <td class="film-details__cell">
                ${getGenresElement()}
            </tr>
          </table>

          <p class="film-details__film-description">
            ${this._description}
          </p>
        </div>
      </div>

      <section class="film-details__controls">
        <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist">
        <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched">
        <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite">
        <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
      </section>
    </div>

    <div class="form-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">4</span></h3>

        <ul class="film-details__comments-list">
          <li class="film-details__comment">
            <span class="film-details__comment-emoji">
              <img src="./images/emoji/smile.png" width="55" height="55" alt="emoji">
            </span>
            <div>
              <p class="film-details__comment-text">Interesting setting and a good cast</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">Tim Macoveev</span>
                <span class="film-details__comment-day">3 days ago</span>
                <button class="film-details__comment-delete">Delete</button>
              </p>
            </div>
          </li>
          <li class="film-details__comment">
            <span class="film-details__comment-emoji">
              <img src="./images/emoji/sleeping.png" width="55" height="55" alt="emoji">
            </span>
            <div>
              <p class="film-details__comment-text">Booooooooooring</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">John Doe</span>
                <span class="film-details__comment-day">2 days ago</span>
                <button class="film-details__comment-delete">Delete</button>
              </p>
            </div>
          </li>
          <li class="film-details__comment">
            <span class="film-details__comment-emoji">
              <img src="./images/emoji/puke.png" width="55" height="55" alt="emoji">
            </span>
            <div>
              <p class="film-details__comment-text">Very very old. Meh</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">John Doe</span>
                <span class="film-details__comment-day">2 days ago</span>
                <button class="film-details__comment-delete">Delete</button>
              </p>
            </div>
          </li>
          <li class="film-details__comment">
            <span class="film-details__comment-emoji">
              <img src="./images/emoji/angry.png" width="55" height="55" alt="emoji">
            </span>
            <div>
              <p class="film-details__comment-text">Almost two hours? Seriously?</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">John Doe</span>
                <span class="film-details__comment-day">Today</span>
                <button class="film-details__comment-delete">Delete</button>
              </p>
            </div>
          </li>
        </ul>

        <div class="film-details__new-comment">
          <div for="add-emoji" class="film-details__add-emoji-label"></div>

          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
          </label>

          <div class="film-details__emoji-list">
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="sleeping">
            <label class="film-details__emoji-label" for="emoji-smile">
              <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="neutral-face">
            <label class="film-details__emoji-label" for="emoji-sleeping">
              <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-gpuke" value="grinning">
            <label class="film-details__emoji-label" for="emoji-gpuke">
              <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="grinning">
            <label class="film-details__emoji-label" for="emoji-angry">
              <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
            </label>
          </div>
        </div>
      </section>
    </div>
  </form>
</section>`;
  }
}

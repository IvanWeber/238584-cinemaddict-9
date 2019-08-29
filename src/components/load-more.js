export default class LoadMore {
  constructor(cardsWrap, cards, button, cardsFeed) {
    this._cardsWrap = cardsWrap;
    this._cards = cards;
    this._button = button;
    this._cardsFeed = cardsFeed;
  }

  initiateLoadMoreButton() {
    if (this._cards.length > this._cardsFeed) {
      for (let i = this._cardsFeed; i < this._cards.length; i++) {
        this._cards[i].classList.add(`visually-hidden`);
      }
    }

    const showNextCards = () => {
      const visuallyHiddenCards = document.querySelectorAll(`.film-card.visually-hidden`);
      if (visuallyHiddenCards.length > this._cardsFeed) {
        for (let k = 0; k < this._cardsFeed; k++) {
          visuallyHiddenCards[k].classList.remove(`visually-hidden`);
        }
      } else {
        for (let k = 0; k < visuallyHiddenCards.length; k++) {
          visuallyHiddenCards[k].classList.remove(`visually-hidden`);
        }
        this._button.classList.add(`visually-hidden`);
      }
    };
    this._button.addEventListener(`click`, showNextCards);
  }
}

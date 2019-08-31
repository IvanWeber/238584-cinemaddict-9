import {createElement} from '../utils.js';

export default class AbstractComponent {

  constructor() {
    // Абстрактные методы класса
    this._abstractMethods = [
      `getTemplate`, // Получить шаблон компонента
    ];
    // Проверка на создание экземпляра абстрактного класса.
    if (new.target === AbstractComponent) {
      throw new TypeError(`Can't instantiate AbstractComponent, only concrete one.`);
    }
    // Проверка на заданность абстрактных методов в дочернем классе
    this._abstractMethods.forEach((method) => {
      if (this[method] === undefined) {
        throw new TypeError(`In ${this.constructor.name} abstract method not implemented: ${method}`);
      }
    });
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }

}

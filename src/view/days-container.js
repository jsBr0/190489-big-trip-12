import {createElement} from "../utils.js";

const createDaysContainerTemplate = (counter, date) => {

  return `<li class="trip-days__item  day">
    <div class="day__info">
      <span class="day__counter">${counter}</span>
      <time class="day__date" datetime="${date.toISOString().substr(0, 10)}">${date.toLocaleString(`en-US`, {month: `short`, day: `2-digit`})}</time>
    </div>
    <ul class="trip-events__list">
    </ul>
  </li>`;
};

export default class DaysContainer {
  constructor(counter, date) {
    this._counter = counter;
    this._date = date;
    this._element = null;
  }

  getTemplate() {
    return createDaysContainerTemplate(this._counter, this._date);
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
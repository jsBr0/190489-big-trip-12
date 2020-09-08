import {createElement, getISOLocalDate, getShortLocalDate} from "../utils.js";

const createDaysContainerTemplate = (counter, date) => {

  const ISODate = getISOLocalDate(date).substr(0, 10);
  const shortDate = getShortLocalDate(date).toUpperCase();

  return `<li class="trip-days__item  day">
    <div class="day__info">
      <span class="day__counter">${counter}</span>
      <time class="day__date" datetime="${ISODate}">${shortDate}</time>
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

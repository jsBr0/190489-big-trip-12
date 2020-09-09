import {getISOLocalDate, getShortLocalDate} from "../utils/waypoint.js";
import AbstractView from "./abstract.js";

const createDayContainerTemplate = (counter, date) => {

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

export default class DayContainer extends AbstractView {
  constructor(counter, date) {
    super();
    this._counter = counter;
    this._date = date;
  }

  getTemplate() {
    return createDayContainerTemplate(this._counter, this._date);
  }
}

import {createElement, getISOLocalDate, getLocalTime} from "../utils.js";

const MINUTES_RATIO = 0.0166666667;
const MAX_OFFERS_COUNT = 3;

const createEventTemplate = (event) => {
  const {type, destination, schedule, price, offers} = event;

  const placeholder = type.group === `Transfer`
    ? `to`
    : `in`;

  const startDateISO = getISOLocalDate(schedule.start);
  const endDateISO = getISOLocalDate(schedule.end);

  const startTime = getLocalTime(startDateISO);
  const endTime = getLocalTime(endDateISO);

  const timeDifference = new Date(schedule.end).getTime() - new Date(schedule.start).getTime();

  const duration = timeDifference / 1000 / 3600 >= 1
    ? Math.round(timeDifference / 1000 / 3600) + `H`
    : Math.round(timeDifference / 1000 / 3600 / MINUTES_RATIO) + `M`;

  const offerTemplate = offers
    .slice(0, MAX_OFFERS_COUNT)
    .map((item) => {
      return `<li class="event__offer">
          <span class="event__offer-title">${item.title}</span>
          +
          €&nbsp;<span class="event__offer-price">${item.price}</span>
         </li>`;
    })
    .join(``);

  return `<li class="trip-events__item">
    <div class="event">
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type.title}.png"
          alt="Event type icon">
      </div>
      <h3 class="event__title">${type.title} ${placeholder} ${destination}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${startDateISO}">${startTime}</time>
          —
          <time class="event__end-time" datetime="${endDateISO}">${endTime}</time>
        </p>
        <p class="event__duration">${duration}</p>
      </div>
      <p class="event__price">
        €&nbsp;<span class="event__price-value">${price}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        ${offerTemplate}
      </ul>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`;
};

export default class Point {
  constructor(events) {
    this._events = events;
    this._element = null;
  }

  getTemplate() {
    return createEventTemplate(this._events);
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

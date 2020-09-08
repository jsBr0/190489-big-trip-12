import {createElement, getISOLocalDate, getLocalTime, getTimeDiff} from "../utils.js";

const MAX_OFFERS_DISPLAY = 3;

const createWaypointTemplate = (event) => {
  const {type, destination, schedule, cost, offers} = event;

  const startDateISO = getISOLocalDate(schedule.start).substr(0, 16);
  const endDateISO = getISOLocalDate(schedule.end).substr(0, 16);

  const startTime = getLocalTime(startDateISO);
  const endTime = getLocalTime(endDateISO);

  const getHumanizedDuration = () => {
    const diff = getTimeDiff(schedule.end, schedule.start);

    let humanizedDuration = `${diff} M`;

    const fullHours = Math.floor(diff / 60);
    const fullDays = fullHours / 24;
    const minutes = diff - fullHours * 60;

    if (diff > 60 && diff < 60 * 24) {
      humanizedDuration = `${fullHours}H ${minutes}M`;
    } else if (diff > 60 * 24) {
      humanizedDuration = `${fullDays}D ${fullHours - fullDays * 24}H ${minutes}M`;
    }

    return humanizedDuration;
  };

  const duration = getHumanizedDuration();

  const offersTemplate = offers
    .slice(0, MAX_OFFERS_DISPLAY)
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
      <h3 class="event__title">${type.title} ${type.placeholder} ${destination}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${startDateISO}">${startTime}</time>
          —
          <time class="event__end-time" datetime="${endDateISO}">${endTime}</time>
        </p>
        <p class="event__duration">${duration}</p>
      </div>
      <p class="event__price">
        €&nbsp;<span class="event__price-value">${cost}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        ${offersTemplate}
      </ul>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`;
};

export default class Waypoint {
  constructor(events) {
    this._events = events;
    this._element = null;
  }

  getTemplate() {
    return createWaypointTemplate(this._events);
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

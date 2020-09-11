import {getISOLocalDate, getLocalTime, getTimeDiff} from "../utils/waypoint.js";
import AbstractView from "./abstract.js";

const OFFERS_DISPLAY = 3;
const HOUR = 60;
const DAY = 24;

const createWaypointTemplate = (event) => {
  const {type, destination, schedule, cost, offers} = event;

  const startDateISO = getISOLocalDate(schedule.start).substr(0, 16);
  const endDateISO = getISOLocalDate(schedule.end).substr(0, 16);

  const startTime = getLocalTime(startDateISO);
  const endTime = getLocalTime(endDateISO);

  const getHumanizedDuration = () => {
    const diff = getTimeDiff(schedule.end, schedule.start);

    let humanizedDuration = `${diff} M`;

    const totalHours = Math.floor(diff / HOUR);
    const totalDays = totalHours / DAY;
    const cleanHours = totalHours - totalDays * DAY;
    const cleanMinutes = diff - totalHours * HOUR;

    if (diff > HOUR && diff < DAY * HOUR) {
      humanizedDuration = `${totalHours}H ${cleanMinutes}M`;
    } else if (diff > DAY * HOUR) {
      humanizedDuration = `${totalDays}D ${cleanHours}H ${cleanMinutes}M`;
    }

    return humanizedDuration;
  };

  const duration = getHumanizedDuration();

  const offerTemplates = offers
    .slice(0, OFFERS_DISPLAY)
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
        ${offerTemplates}
      </ul>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`;
};

export default class Waypoint extends AbstractView {
  constructor(events) {
    super();
    this._events = events;
    this._editClickHandler = this._editClickHandler.bind(this);
  }

  getTemplate() {
    return createWaypointTemplate(this._events);
  }

  _editClickHandler(evt) {
    evt.preventDefault();
    this._callback.editClick();
  }

  setEditClickHandler(callback) {
    this._callback.editClick = callback;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._editClickHandler);
  }
}

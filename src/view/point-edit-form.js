import {createElement, getLongLocalDate} from "../utils.js";
import {EVENT_TYPES, DESTINATIONS, OFFERS} from "../const.js";

const NEW_EVENT = {
  type: {group: `Transfer`, placeholder: `to`, title: `Taxi`},
  destination: ``,
  schedule: {start: null, end: null},
  cost: ``,
  offers: {name: ``, title: ``, price: ``},
  info: {
    description: ``,
    photos: ``,
  },
};

const createWaypointFormTemplate = (event) => {
  const {type, destination, schedule, cost, info} = event;

  const longStartDate = getLongLocalDate(schedule.start);
  const longEndDate = getLongLocalDate(schedule.end);

  const eventTypesListTemplate = (list) => {
    return list.map((item) => {
      const titleLowerCase = item.title.toLowerCase();
      return `<div class="event__type-item">
      <input id="event-type-${titleLowerCase}-1" class="event__type-input  visually-hidden" type="radio" name="event-type"
        value="${titleLowerCase}">
      <label class="event__type-label  event__type-label--${titleLowerCase}" for="event-type-${titleLowerCase}-1">${item.title}</label>
    </div>`;
    })
    .join(``);
  };

  const eventActivityTemplate = eventTypesListTemplate(EVENT_TYPES
    .filter(function (item) {
      return item.group === `Activity`;
    }));

  const eventTransferTemplate = eventTypesListTemplate(EVENT_TYPES
    .filter(function (item) {
      return item.group === `Transfer`;
    }));

  const destinationsTemplate = DESTINATIONS
  .map((item) => {
    return `<option value="${item}"></option>`;
  })
  .join(``);

  const offersTemplate = OFFERS
    .map((item) => {
      return `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${item.name}-1" type="checkbox"
        name="event-offer-${item.name}">
      <label class="event__offer-label" for="event-offer-${item.name}-1">
        <span class="event__offer-title">${item.title}</span>
        +
        €&nbsp;<span class="event__offer-price">${item.price}</span>
      </label>
    </div>`;
    })
    .join(``);

  const destinationPhotosTemplate = info.photos
    .map((item) => {
      return `<img class="event__photo" src="${item}" alt="Event photo">`;
    })
    .join(``);


  return `<form class="trip-events__item  event  event--edit" action="#" method="post">
  <header class="event__header">
    <div class="event__type-wrapper">
      <label class="event__type  event__type-btn" for="event-type-toggle-1">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" width="17" height="17" src="img/icons/${type.title}.png" alt="Event type icon">
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
      <div class="event__type-list">
        <fieldset class="event__type-group">
          <legend class="visually-hidden">Transfer</legend>
          ${eventTransferTemplate}
        </fieldset>
        <fieldset class="event__type-group">
          <legend class="visually-hidden">Activity</legend>
          ${eventActivityTemplate}
        </fieldset>
      </div>
    </div>
    <div class="event__field-group  event__field-group--destination">
      <label class="event__label  event__type-output" for="event-destination-1">
        ${type.title} ${type.placeholder}
      </label>
      <input class="event__input  event__input--destination" id="event-destination-1" type="text"
        name="event-destination" value="${destination}" list="destination-list-1">
      <datalist id="destination-list-1">
        ${destinationsTemplate};
      </datalist>
    </div>
    <div class="event__field-group  event__field-group--time">
      <label class="visually-hidden" for="event-start-time-1">
        From
      </label>
      <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time"
        value="${longStartDate}">
      &mdash;
      <label class="visually-hidden" for="event-end-time-1">
        To
      </label>
      <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time"
        value="${longEndDate}">
    </div>
    <div class="event__field-group  event__field-group--price">
      <label class="event__label" for="event-price-1">
        <span class="visually-hidden">Price</span>
        &euro;
      </label>
      <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${cost}">
    </div>
    <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
    <button class="event__reset-btn" type="reset">Cancel</button>
  </header>
  <section class="event__details">
    <section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>

      <div class="event__available-offers">
        ${offersTemplate}
      </div>
    </section>

    <section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${info.description}</p>

      <div class="event__photos-container">
        <div class="event__photos-tape">
          ${destinationPhotosTemplate}
        </div>
      </div>
    </section>
  </section>
</form`;
};

export default class WaypointForm {
  constructor(event = NEW_EVENT) {
    this._event = event;
    this._element = null;
  }

  getTemplate() {
    return createWaypointFormTemplate(this._event);
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

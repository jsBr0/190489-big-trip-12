import {createElement, getFormattedLocalDate} from "../utils.js";
import {EVENT_TYPES, DESTINATIONS, OFFERS} from "../const.js";

const FIRST_EVENT = {
  types: {group: `Transfer`, title: `Taxi`},
  destinations: ``,
  schedule: {start: null, end: null},
  price: ``,
  offers: {key: ``, title: ``, price: ``},
  info: {
    description: ``,
    photos: ``,
  },
};

// Не работает.

const createEventEditFormTemplate = (event) => {
  const {type, destination, schedule, price, info} = event;

  const formattedStartDate = getFormattedLocalDate(schedule.start);
  const formattedEndDate = getFormattedLocalDate(schedule.end);

  const placeholder = type.group === `Transfer`
    ? `to`
    : `in`;

  const eventTransferTemplate = EVENT_TYPES
    .map((item) => {
      const titleLowerCase = item.title.toLowerCase();
      const template = `<div class="event__type-item">
      <input id="event-type-${titleLowerCase}-1" class="event__type-input  visually-hidden" type="radio" name="event-type"
        value="${titleLowerCase}">
      <label class="event__type-label  event__type-label--${titleLowerCase}" for="event-type-${titleLowerCase}-1">${item.title}</label>
    </div>`;
      if (item.group === `Transfer`) {
        return template;
      }
    })
    .join(``);

  const eventActivityTemplate = EVENT_TYPES
    .map((item) => {
      const titleLowerCase = item.title.toLowerCase();
      const template = `<div class="event__type-item">
      <input id="event-type-${titleLowerCase}-1" class="event__type-input  visually-hidden" type="radio" name="event-type"
        value="${titleLowerCase}">
      <label class="event__type-label  event__type-label--${titleLowerCase}" for="event-type-${titleLowerCase}-1">${item.title}</label>
    </div>`;
      if (item.group === `Activity`) {
        return template;
      }
    })
    .join(``);

  // Плохо. Как упростить? Для этой переменной взял данные не из моков а из констант, т.к. нужен весь массив для отрисовки, а не одно значение.

  const destinationTemplate = DESTINATIONS
  .map((item) => {
    return `<option value="${item}"></option>`;
  })
  .join(``);

  // Откуда взялся Amsterdam?

  const offerTemplate = OFFERS
    .map((item) => {
      return `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${item.key}-1" type="checkbox"
        name="event-offer-${item.key}">
      <label class="event__offer-label" for="event-offer-${item.key}-1">
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


  return `<li class="trip-events__item">
  <form class="trip-events__item  event  event--edit" action="#" method="post">
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
        ${type.title} ${placeholder}
      </label>
      <input class="event__input  event__input--destination" id="event-destination-1" type="text"
        name="event-destination" value="${destination}" list="destination-list-1">
      <datalist id="destination-list-1">
        ${destinationTemplate};
      </datalist>
    </div>
    <div class="event__field-group  event__field-group--time">
      <label class="visually-hidden" for="event-start-time-1">
        From
      </label>
      <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time"
        value="${formattedStartDate}">
      &mdash;
      <label class="visually-hidden" for="event-end-time-1">
        To
      </label>
      <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time"
        value="${formattedEndDate}">
    </div>
    <div class="event__field-group  event__field-group--price">
      <label class="event__label" for="event-price-1">
        <span class="visually-hidden">Price</span>
        &euro;
      </label>
      <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
    </div>
    <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
    <button class="event__reset-btn" type="reset">Cancel</button>
  </header>
  <section class="event__details">
    <section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>

      <div class="event__available-offers">
        ${offerTemplate}
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
</form>
</li>`;
};

// Чтобы работал eventEditComponent.getElement().querySelector(`form`) (main.str 67), пришлось заключить форму в <li> и теперь, получается, что форма пригодна только для редактирования.
// А как же тогда ее использовать для новых событий?

export default class EventEdit {
  constructor(event = FIRST_EVENT) {
    this._event = event;
    this._element = null;
  }

  getTemplate() {
    return createEventEditFormTemplate(this._event);
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

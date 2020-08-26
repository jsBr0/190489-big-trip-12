import {getISODate, getTime} from "../utils.js";

const MINUTES_RATIO = 0.0166666667;

export const createWaypointTemplate = (event) => {
  const {types, destinations, schedule, price, offers} = event;

  const placeholder = types.group === `Transfer`
    ? `to`
    : `in`;

  const startDateISO = getISODate(schedule.start);
  const endDateISO = getISODate(schedule.end);

  const startTime = getTime(startDateISO);
  const endTime = getTime(endDateISO);

  const timeDifference = new Date(schedule.end).getTime() - new Date(schedule.start).getTime();

  const duration = timeDifference / 1000 / 3600 >= 1
    ? Math.round(timeDifference / 1000 / 3600) + `H`
    : Math.round(timeDifference / 1000 / 3600 / MINUTES_RATIO) + `M`;

  const offerTemplate = offers
    .slice(0, 3)
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
        <img class="event__type-icon" width="42" height="42" src="img/icons/${types.title.toLowerCase()}.png"
          alt="Event type icon">
      </div>
      <h3 class="event__title">${types.title} ${placeholder} ${destinations}</h3>
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

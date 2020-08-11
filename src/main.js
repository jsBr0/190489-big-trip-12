import {createMenuTemplate} from "./view/menu.js";
import {createFilterTemplate} from "./view/filter.js";
import {createSortTemplate} from "./view/sort.js";
import {createNewEditTemplate} from "./view/new-edit-form.js";
import {createDayItemTemplate} from "./view/day-item.js";
import {createWaypointTemplate} from "./view/waypoint.js";
import {createTripInfoRouteTemplate} from "./view/trip-info-route.js";
import {createTripInfoCostTemplate} from "./view/trip-info-cost.js";

import {generateTrip} from "./mock.js";

console.log(generateTrip());

const TASK_COUNT = 3;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteMenuControlsElement = document.querySelector(`.trip-main__trip-controls`);

render(siteMenuControlsElement.firstElementChild, createMenuTemplate(), `afterend`);
render(siteMenuControlsElement.lastElementChild, createFilterTemplate(), `afterend`);

const siteEventsElement = document.querySelector(`.trip-events`);

render(siteEventsElement, createSortTemplate(), `beforeend`);
render(siteEventsElement, createNewEditTemplate(), `beforeend`);
render(siteEventsElement, createDayItemTemplate(), `beforeend`);

const siteEventsListElement = document.querySelector(`.trip-events__list`);

for (let i = 0; i < TASK_COUNT; i++) {
  render(siteEventsListElement, createWaypointTemplate(), `afterbegin`);
}

const siteTripInfoElement = document.querySelector(`.trip-main`);

render(siteTripInfoElement, createTripInfoRouteTemplate(), `afterbegin`);

const siteTripInfoRouteElement = document.querySelector(`.trip-info__main`);

render(siteTripInfoRouteElement, createTripInfoCostTemplate(), `afterend`);

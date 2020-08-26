import {createTripInfoMainTemplate} from "./view/trip-info.js";
import {createTripInfoRouteTemplate} from "./view/trip-info-route.js";
import {createTripInfoCostTemplate} from "./view/trip-info-cost.js";
import {createMenuTemplate} from "./view/menu.js";
import {createFilterTemplate} from "./view/filter.js";
import {createSortTemplate} from "./view/sort.js";
import {createDaysListTemplate} from "./view/days-list.js";
import {createDaysItemTemplate} from "./view/days-item.js";
import {createWaypointTemplate} from "./view/waypoint.js";
import {createNewEditTemplate} from "./view/new-edit-form.js";
import {render} from "./utils.js";
import {generateEventData} from "./mock/event.js";

const TASK_DATA_COUNT = 15;

const eventsArr = new Array(TASK_DATA_COUNT)
.fill()
.map(generateEventData)
.sort((a, b) => {
  return new Date(a.schedule.start) - new Date(b.schedule.start);
});

const firstEvent = eventsArr[0];

const events = new Map();

eventsArr.slice(1, eventsArr.length).forEach((element) => {
  let dateWithoutTime = element.schedule.start.toDateString();

  if (!events.has(dateWithoutTime)) {
    events.set(dateWithoutTime, []);
  }
  events.get(dateWithoutTime).push(element);
});

const siteTripMainElement = document.querySelector(`.trip-main`);

render(siteTripMainElement, createTripInfoMainTemplate(), `afterbegin`);

const siteTripInfoElement = document.querySelector(`.trip-main__trip-info`);

render(siteTripInfoElement, createTripInfoRouteTemplate(), `beforeend`);

render(siteTripInfoElement, createTripInfoCostTemplate(), `beforeend`);

const siteTripControlsElement = document.querySelector(`.trip-main__trip-controls`);

render(siteTripControlsElement.firstElementChild, createMenuTemplate(), `afterend`);

render(siteTripControlsElement.lastElementChild, createFilterTemplate(), `afterend`);

const siteEventsElement = document.querySelector(`.trip-events`);

render(siteEventsElement, createSortTemplate(), `beforeend`);

render(siteEventsElement, createDaysListTemplate(), `beforeend`);

const siteDaysListElement = document.querySelector(`.trip-days`);

const renderEvents = (data) => {
  let dayIndex = 1;

  for (const [key, value] of data.entries()) {
    const date = new Date(key);

    render(siteDaysListElement, createDaysItemTemplate(dayIndex, date), `beforeend`);
    const siteEventsListElement = Array.from(document.querySelectorAll(`.trip-events__list`)).pop();

    value.forEach((element) => {
      render(siteEventsListElement, createWaypointTemplate(element), `beforeend`);
    });

    dayIndex++;
  }
};

renderEvents(events);

const buttonNewEvent = document.querySelector(`.trip-main__event-add-btn`);

buttonNewEvent.addEventListener(`click`, (evt) => {
  evt.preventDefault();

  buttonNewEvent.setAttribute(`disabled`, `true`);

  const siteTripSortElement = document.querySelector(`.trip-events__trip-sort`);
  render(siteTripSortElement, createNewEditTemplate(firstEvent), `afterend`);
});

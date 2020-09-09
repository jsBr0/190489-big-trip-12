import TripInfoView from "./view/trip-info.js";
import MenuView from "./view/menu.js";
import FilterView from "./view/filter.js";
import SortView from "./view/sort.js";
import DayListView from "./view/day-list.js";
import DayContainerView from "./view/day-container.js";
import WaypointView from "./view/waypoint.js";
import WaypointFormView from "./view/waypoint-form.js";
import NoWaypointView from "./view/no-waypoint.js";
import {render, RenderPosition, replace} from "./utils/render.js";
import {generateEvent} from "./mock/event.js";
import TripPresenter from "./presenter/trip.js";

const TASK_DATA_COUNT = 15;

const arr = new Array(TASK_DATA_COUNT)
.fill()
.map(generateEvent)
.sort((a, b) => {
  return new Date(a.schedule.start) - new Date(b.schedule.start);
});

const events = new Map();

arr.forEach((element) => {
  let dateWithoutTime = element.schedule.start.toDateString();

  if (!events.has(dateWithoutTime)) {
    events.set(dateWithoutTime, []);
  }
  events.get(dateWithoutTime).push(element);
});

const siteMainElement = document.querySelector(`.trip-main`);
const siteTripControlsElement = document.querySelector(`.trip-main__trip-controls`);

render(siteMainElement, new TripInfoView(), RenderPosition.AFTERBEGIN);
render(siteTripControlsElement.firstElementChild, new MenuView(), RenderPosition.AFTEREND);
render(siteTripControlsElement.lastElementChild, new FilterView(), RenderPosition.AFTEREND);

const siteEventsElement = document.querySelector(`.trip-events`);

render(siteEventsElement, new SortView(), RenderPosition.BEFOREEND);

render(siteEventsElement, new DayListView(), RenderPosition.BEFOREEND);

const renderWaypoint = (eventsListElement, event) => {
  const waypointComponent = new WaypointView(event);
  const waypointFormComponent = new WaypointFormView(event);

  const replaceWaypointToForm = () => {
    replace(waypointFormComponent, waypointComponent);
  };

  const replaceFormToWaypoint = () => {
    replace(waypointComponent, waypointFormComponent);
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      replaceFormToWaypoint();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  waypointComponent.setEditClickHandler(() => {
    replaceWaypointToForm();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  waypointFormComponent.setFormSubmitHandler(() => {
    replaceFormToWaypoint();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(eventsListElement, waypointComponent, RenderPosition.BEFOREEND);
};

const siteDaysListElement = document.querySelector(`.trip-days`);

const renderWaypointsList = (data) => {
  let dayIndex = 1;

  for (const [key, value] of data.entries()) {
    const date = new Date(key);

    render(siteDaysListElement, new DayContainerView(dayIndex, date), RenderPosition.BEFOREEND);

    const siteEventsListElement = Array.from(document.querySelectorAll(`.trip-events__list`)).pop();

    value.forEach((element) => {
      renderWaypoint(siteEventsListElement, element);
    });

    dayIndex++;
  }
};

if (events.size !== 0) {
  renderWaypointsList(events);
} else {
  render(siteEventsElement, new NoWaypointView(), RenderPosition.BEFOREEND);
}

const tripPresenter = new TripPresenter(siteEventsElement);

tripPresenter.init(events);

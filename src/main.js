import TripSummaryView from "./view/trip-summary.js";
import TripCostView from "./view/trip-cost.js";
import SiteMenuView from "./view/site-menu.js";
import SiteFilterView from "./view/site-filter.js";
import SiteSortView from "./view/site-sort.js";
import DaysListView from "./view/days-list.js";
import DaysContainerView from "./view/days-container.js";
import WaypointView from "./view/point.js";
import WaypointFormView from "./view/point-edit-form.js";
import NoPointsView from "./view/no-points.js";
import {render, RenderPosition} from "./utils.js";
import {generateEvent} from "./mock/event.js";

const TASK_DATA_COUNT = 15;

const eventsArr = new Array(TASK_DATA_COUNT)
.fill()
.map(generateEvent)
.sort((a, b) => {
  return new Date(a.schedule.start) - new Date(b.schedule.start);
});

const events = new Map();

eventsArr.forEach((element) => {
  let dateWithoutTime = element.schedule.start.toDateString();

  if (!events.has(dateWithoutTime)) {
    events.set(dateWithoutTime, []);
  }
  events.get(dateWithoutTime).push(element);
});

const siteTripMainElement = document.querySelector(`.trip-main`);

render(siteTripMainElement, new TripSummaryView().getElement(), RenderPosition.AFTERBEGIN);

const siteTripInfoElement = document.querySelector(`.trip-main__trip-info`);

render(siteTripInfoElement, new TripCostView().getElement(), RenderPosition.BEFOREEND);

const siteTripControlsElement = document.querySelector(`.trip-main__trip-controls`);

render(siteTripControlsElement.firstElementChild, new SiteMenuView().getElement(), RenderPosition.AFTEREND);

render(siteTripControlsElement.lastElementChild, new SiteFilterView().getElement(), RenderPosition.AFTEREND);

const siteEventsElement = document.querySelector(`.trip-events`);

render(siteEventsElement, new SiteSortView().getElement(), RenderPosition.BEFOREEND);

render(siteEventsElement, new DaysListView().getElement(), RenderPosition.BEFOREEND);

const renderWaypoint = (eventsListElement, event) => {
  const waypointComponent = new WaypointView(event);
  const waypointFormComponent = new WaypointFormView(event);

  const replaceWaypointToForm = () => {
    eventsListElement.replaceChild(waypointFormComponent.getElement(), waypointComponent.getElement());
  };

  const replaceFormToWaypoint = () => {
    eventsListElement.replaceChild(waypointComponent.getElement(), waypointFormComponent.getElement());
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      replaceFormToWaypoint();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  waypointComponent.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
    replaceWaypointToForm();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  waypointFormComponent.getElement().addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    replaceFormToWaypoint();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(eventsListElement, waypointComponent.getElement(), RenderPosition.BEFOREEND);
};

const siteDaysListElement = document.querySelector(`.trip-days`);

const renderWaypointsList = (data) => {
  let dayIndex = 1;

  for (const [key, value] of data.entries()) {
    const date = new Date(key);

    render(siteDaysListElement, new DaysContainerView(dayIndex, date).getElement(), RenderPosition.BEFOREEND);

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
  render(siteEventsElement, new NoPointsView().getElement(), RenderPosition.BEFOREEND);
}

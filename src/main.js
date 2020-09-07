import TripSummaryView from "./view/trip-summary.js";
import TripCostView from "./view/trip-cost.js";
import SiteMenuView from "./view/site-menu.js";
import SiteFilterView from "./view/site-filter.js";
import SiteSortView from "./view/site-sort.js";
import DaysListView from "./view/days-list.js";
import DaysContainerView from "./view/days-container.js";
import PointView from "./view/point.js";
import PointEditView from "./view/point-edit-form.js";
import NoPointView from "./view/no-point.js";
import {render, RenderPosition} from "./utils.js";
import {generateEventData} from "./mock/event.js";

const TASK_DATA_COUNT = 15;

const eventsArr = new Array(TASK_DATA_COUNT)
.fill()
.map(generateEventData)
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

const renderEvent = (eventListElement, event) => {
  const eventComponent = new PointView(event);
  const eventEditComponent = new PointEditView(event);

  const replacePointToForm = () => {
    eventListElement.replaceChild(eventEditComponent.getElement(), eventComponent.getElement());
  };

  const replaceFormToPoint = () => {
    eventListElement.replaceChild(eventComponent.getElement(), eventEditComponent.getElement());
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      replaceFormToPoint();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  eventComponent.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
    replacePointToForm();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  eventEditComponent.getElement().addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    replaceFormToPoint();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(eventListElement, eventComponent.getElement(), RenderPosition.BEFOREEND);
};

const siteDaysListElement = document.querySelector(`.trip-days`);

if (siteDaysListElement.childElementCount === 0) {
  render(siteEventsElement, new NoPointView().getElement(), RenderPosition.BEFOREEND);
}

const renderEvents = (data) => {
  let dayIndex = 1;

  for (const [key, value] of data.entries()) {
    const date = new Date(key);

    render(siteDaysListElement, new DaysContainerView(dayIndex, date).getElement(), RenderPosition.BEFOREEND);

    const siteEventsListElement = Array.from(document.querySelectorAll(`.trip-events__list`)).pop();

    value.forEach((element) => {
      renderEvent(siteEventsListElement, element);
    });

    dayIndex++;
  }
};

renderEvents(events);

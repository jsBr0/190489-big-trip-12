import TripInfoView from "./view/trip-info.js";
import MenuView from "./view/menu.js";
import FilterView from "./view/filter.js";
import TripPresenter from "./presenter/trip.js";
import {render, RenderPosition} from "./utils/render.js";
import {generateEvent} from "./mock/event.js";

const TASK_DATA_COUNT = 15;

const events = new Array(TASK_DATA_COUNT)
.fill()
.map(generateEvent)
.sort((date1, date2) => {
  return new Date(date1.schedule.start) - new Date(date2.schedule.start);
});

const siteMainElement = document.querySelector(`.trip-main`);
const siteTripControlsElement = document.querySelector(`.trip-main__trip-controls`);

render(siteMainElement, new TripInfoView(), RenderPosition.AFTERBEGIN);
render(siteTripControlsElement.firstElementChild, new MenuView(), RenderPosition.AFTEREND);
render(siteTripControlsElement.lastElementChild, new FilterView(), RenderPosition.AFTEREND);

const siteEventsElement = document.querySelector(`.trip-events`);

const tripPresenter = new TripPresenter(siteEventsElement);

tripPresenter.init(events);

import SortView from "../view/sort.js";
import DayListView from "../view/day-list.js";
import DayContainerView from "../view/day-container.js";
import NoWaypointView from "../view/no-waypoint.js";
import WaypointView from "../view/waypoint.js";
import WaypointFormView from "../view/waypoint-form.js";
import {render, RenderPosition, replace} from "../utils/render.js";
import {sortWaypointTime, sortWaypointPrice} from "../utils/waypoint.js";
import {SortType} from "../const.js";

export default class Trip {
  constructor(tripEventsContainer) {
    this._tripEventsContainer = tripEventsContainer;
    this._currentSortType = SortType.DEFAULT;

    this._sortComponent = new SortView();
    this._dayListComponent = new DayListView();
    this._noWaypointComponent = new NoWaypointView();

    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(events) {
    this._tripEvents = events.slice();
    this._sourcedEvents = events.slice();

    this._sortEventsByDay();

    this._renderTrip();
  }

  _sortEventsByDay() {
    this._eventsByDay = new Map();

    this._tripEvents.forEach((event) => {
      const date = event.schedule.start.toDateString();

      if (!this._eventsByDay.has(date)) {
        this._eventsByDay.set(date, []);
      }

      this._eventsByDay.get(date).push(event);
    });
  }

  _sortWaypoints(sortType) {
    switch (sortType) {
      case SortType.TIME:
        this._tripEvents.sort(sortWaypointTime);
        break;
      case SortType.PRICE:
        this._tripEvents.sort(sortWaypointPrice);
        break;
      default:
        this._tripEvents = this._sourcedEvents.slice();
    }

    this._currentSortType = sortType;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortWaypoints(sortType);
    this._clearWaypointList();

    if (this._currentSortType === SortType.DEFAULT) {
      this._renderWaypointEventList();
    } else {
      this._renderWaypointSortList();
    }
  }

  _renderSort() {
    render(this._tripEventsContainer, this._sortComponent, RenderPosition.BEFOREEND);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderWaypoint(container, event) {
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

    render(container, waypointComponent, RenderPosition.BEFOREEND);
  }

  _renderWaypointEventList() {
    let dayIndex = 1;

    for (const [key, value] of this._eventsByDay.entries()) {
      const eventDate = key === `sort` ? `` : new Date(key);

      const dayContainerComponent = new DayContainerView(dayIndex, eventDate);

      render(this._tripEventsContainer, this._dayListComponent, RenderPosition.BEFOREEND);
      render(this._dayListComponent, dayContainerComponent, RenderPosition.BEFOREEND);

      const eventsList = Array.from(document.querySelectorAll(`.trip-events__list`)).pop();

      value.forEach((item) => {
        this._renderWaypoint(eventsList, item);
      });

      dayIndex++;
    }
  }

  _renderWaypointSortList() {
    const dayContainerComponent = new DayContainerView();

    render(this._tripEventsContainer, this._dayListComponent, RenderPosition.BEFOREEND);
    render(this._dayListComponent, dayContainerComponent, RenderPosition.BEFOREEND);

    const eventsList = Array.from(document.querySelectorAll(`.trip-events__list`)).pop();

    this._tripEvents.forEach((item) => {
      this._renderWaypoint(eventsList, item);
    });
  }

  _clearWaypointList() {
    this._sortComponent.getElement().querySelector(`.trip-sort__item--day`).innerHTML = ``;
    this._dayListComponent.getElement().innerHTML = ``;
  }

  _renderNoWaypoint() {
    render(this._tripEventsContainer, this._noWaypointComponent, RenderPosition.BEFOREEND);
  }

  _renderTrip() {
    if (this._tripEvents.size === 0) {
      this._renderNoWaypoint();
      return;
    }

    this._renderSort();
    this._renderWaypointEventList();
  }
}


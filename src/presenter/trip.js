import SortView from "../view/sort.js";
import DayListView from "../view/day-list.js";
import DayContainerView from "../view/day-container.js";
import NoWaypointView from "../view/no-waypoint.js";
import WaypointPresenter from "../presenter/waypoint.js"
import WaypointContainerView from "../view/waypoint-container.js"
import {updateItem} from "../utils/common.js";
import {render, RenderPosition} from "../utils/render.js";
import {sortWaypointsByTime, sortWaypointsByPrice} from "../utils/waypoint.js";
import {SortType} from "../const.js";

export default class Trip {
  constructor(tripEventsContainer) {
    this._tripEventsContainer = tripEventsContainer;
    this._currentSortType = SortType.EVENT;
    this._waypointPresenter = {};

    this._sortComponent = new SortView();
    this._dayListComponent = new DayListView();
    this._noWaypointComponent = new NoWaypointView();
    this._waypointContainerComponent = new WaypointContainerView();

    this._handleWaypointChange = this._handleWaypointChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(events) {
    this._tripEvents = events.slice();
    this._sourcedEvents = events.slice();

    this._renderBigTrip();
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

  _handleWaypointChange(updatedEvent) {
    this._tripEvents = updateItem(this._tripEvents, updatedEvent);
    this._sourcedEvents = updateItem(this._sourcedEvents, updatedEvent);
    this._waypointPresenter[updatedEvent.id].init(updatedEvent);
  }

  _sortWaypoints(sortType) {
    switch (sortType) {
      case SortType.TIME:
        this._tripEvents.sort(sortWaypointsByTime);
        break;
      case SortType.PRICE:
        this._tripEvents.sort(sortWaypointsByPrice);
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
    this._clearWaypointsList();

    if (this._currentSortType === SortType.EVENT) {
      this._renderWaypointsList();
    } else {
      this._renderWaypointsListSort();
    }
  }

  _renderSort() {
    render(this._tripEventsContainer, this._sortComponent, RenderPosition.BEFOREEND);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderWaypoint(container, event) {
    const waypointPresenter = new WaypointPresenter(container, this._handleWaypointChange);
    waypointPresenter.init(event);
    this._waypointPresenter[event.id] = waypointPresenter;
  }

  _renderWaypointsList() {
    this._sortEventsByDay();

    let dayIndex = 1;

    for (const [key, value] of this._eventsByDay.entries()) {
      const date = new Date(key);

      const dayContainerComponent = new DayContainerView(dayIndex, date);

      render(this._tripEventsContainer, this._dayListComponent, RenderPosition.BEFOREEND);
      render(this._dayListComponent, dayContainerComponent, RenderPosition.BEFOREEND);

      const lastEventsListItem = Array.from(document.querySelectorAll(`.trip-events__list`)).pop();
      render(lastEventsListItem, this._waypointContainerComponent, RenderPosition.BEFOREEND);
      // console.log(lastEventsListItem) WTF???;

      value.forEach((event) => {
        this._renderWaypoint(this._waypointContainerComponent, event);
      });

      dayIndex++;
    }
  }

  _renderWaypointsListSort() {
    const dayContainerComponent = new DayContainerView();

    render(this._tripEventsContainer, this._dayListComponent, RenderPosition.BEFOREEND);
    render(this._dayListComponent, dayContainerComponent, RenderPosition.BEFOREEND);

    const tripEventsList = Array.from(document.querySelectorAll(`.trip-events__list`)).pop();

    this._tripEvents.forEach((event) => {
      this._renderWaypoint(tripEventsList, event);
    });
  }

  _clearWaypointsList() {
    this._dayListComponent.getElement().innerHTML = ``;
    Object
      .values(this._waypointPresenter)
      .forEach((presenter) => presenter.destroy());
    this._waypointPresenter = {};
  }

  _renderNoWaypoints() {
    render(this._tripEventsContainer, this._noWaypointComponent, RenderPosition.BEFOREEND);
  }

  _renderBigTrip() {
    if (this._tripEvents.length === 0) {
      this._renderNoWaypoints();
      return;
    }

    this._renderSort();
    this._renderWaypointsList();
  }
}


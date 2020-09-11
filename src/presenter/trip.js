import SortView from "../view/sort.js";
import DayListView from "../view/day-list.js";
import DayContainerView from "../view/day-container.js";
import NoWaypointView from "../view/no-waypoint.js";
import WaypointView from "../view/waypoint.js";
import WaypointFormView from "../view/waypoint-form.js";
import {render, RenderPosition, replace} from "../utils/render.js";

export default class Trip {
  constructor(tripEventsContainer) {
    this._tripEventsContainer = tripEventsContainer;

    this._sortComponent = new SortView();
    this._dayListComponent = new DayListView();
    this._noWaypointComponent = new NoWaypointView();

    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(events) {
    this._events = new Map(events);

    this._renderBigTrip();
  }

  _handleSortTypeChange(sortType) {
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

  _renderWaypointList() {
    let dayIndex = 1;

    for (const [key, value] of this._events.entries()) {
      const eventDate = new Date(key);

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

  _renderNoWaypoint() {
    render(this._tripEventsContainer, this._noWaypointComponent, RenderPosition.BEFOREEND);
  }

  _renderBigTrip() {
    if (this._events.size === 0) {
      this._renderNoWaypoint();
      return;
    }

    this._renderSort();
    this._renderWaypointList();
  }
}


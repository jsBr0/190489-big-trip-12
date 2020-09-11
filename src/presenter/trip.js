import SortView from "../view/sort.js";
import DayListView from "../view/day-list.js";
import DayContainerView from "../view/day-container.js";
import NoWaypointView from "../view/no-waypoint.js";
import WaypointView from "../view/waypoint.js";
import WaypointFormView from "../view/waypoint-form.js";
import {render, RenderPosition, replace} from "../utils/render.js";

export default class Trip {
  constructor(tripContainer) {
    this._tripContainer = tripContainer;

    this._sortComponent = new SortView();
    this._dayListComponent = new DayListView();
    this._noWaypointComponent = new NoWaypointView();
  }

  init(events) {
    this._events = new Map(events);

    render(this._tripContainer, this._sortComponent, RenderPosition.BEFOREEND);
    render(this._tripContainer, this._dayListComponent, RenderPosition.BEFOREEND);

    this._renderWaypoints();
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

  _renderWaypointsList() {
    let dayIndex = 1;

    for (const [key, value] of this._events.entries()) {
      const date = new Date(key);

      render(this._dayListComponent, new DayContainerView(dayIndex, date), RenderPosition.BEFOREEND);

      const eventsList = Array.from(document.querySelectorAll(`.trip-events__list`)).pop();

      value.forEach((item) => {
        this._renderWaypoint(eventsList, item);
      });

      dayIndex++;
    }
  }

  _renderWaypoints() {
    if (this._events.size !== 0) {
      this._renderWaypointsList();
    } else {
      render(this._tripContainer, this._noWaypointComponent, RenderPosition.BEFOREEND);
    }
  }
}

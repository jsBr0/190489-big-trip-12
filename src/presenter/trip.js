import TripInfoView from "../view/trip-info.js";
import MenuView from "../view/menu.js";
import FilterView from "../view/filter.js";
import SortView from "../view/sort.js";
import DayListView from "../view/day-list.js";
import DayContainerView from "../view/day-container.js";
import WaypointView from "../view/waypoint.js";
import WaypointFormView from "../view/waypoint-form.js";
import NoWaypointView from "../view/no-waypoint.js";
import {render, RenderPosition} from "../utils/render.js";

const TASK_DATA_COUNT = 15;

export default class Trip {
  constructor(tripContainer) {
    this._container = tripContainer;
    this._renderedTaskCount = TASK_DATA_COUNT;

  }

  init(events) {
    this._events = new Map(events);
  }

}

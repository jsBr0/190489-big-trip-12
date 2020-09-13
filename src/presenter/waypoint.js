import WaypointView from "../view/waypoint.js";
import WaypointFormView from "../view/waypoint-form.js";
import {render, RenderPosition, replace, remove} from "../utils/render.js";

export default class Waypoint {
  constructor(eventsListContainer) {
    this._eventsListContainer = eventsListContainer;

    this._waypointComponent = null;
    this._waypointFormComponent = null;

    this._handleEditClick = this._handleEditClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(event) {
    this._event = event;

    const prevWaypointComponent = this._waypointComponent;
    const prevWaypointFormComponent = this._waypointFormComponent;

    this._waypointComponent = new WaypointView(event);
    this._waypointFormComponent = new WaypointFormView(event);

    this._waypointComponent.setEditClickHandler(this._handleEditClick);
    this._waypointFormComponent.setFormSubmitHandler(this._handleFormSubmit);

    if (prevWaypointComponent === null || prevWaypointFormComponent === null) {
      render(this._eventsListContainer, this._waypointComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._eventsListContainer.getElement().contains(prevWaypointComponent.getElement())) {
      replace(this._waypointComponent, prevWaypointComponent);
    }

    if (this._eventsListContainer.getElement().contains(prevWaypointFormComponent.getElement())) {
      replace(this._waypointFormComponent, prevWaypointFormComponent);
    }

    remove(prevWaypointComponent);
    remove(prevWaypointFormComponent);
  }

  destroy() {
    remove(this._waypointComponent);
    remove(this._waypointFormComponent);
  }

  _replaceWaypointToForm() {
    replace(this._waypointFormComponent, this._waypointComponent);
    document.addEventListener(`keydown`, this._escKeyDownHandler);
  }

  _replaceFormToWaypoint() {
    replace(this._waypointComponent, this._waypointFormComponent);
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._replaceFormToWaypoint();
    }
  }

  _handleEditClick() {
    this._replaceWaypointToForm();
  }

  _handleFormSubmit() {
    this._replaceFormToWaypoint();
  }
}

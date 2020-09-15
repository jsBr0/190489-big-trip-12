import AbstractView from "./abstract.js";

const createWaypointContainerTemplate = () => {
  return `<li class="trip-events__item"></li>`;
};

export default class WaypointContainer extends AbstractView {
  getTemplate() {
    return createWaypointContainerTemplate();
  }
}

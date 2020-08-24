export const createDaysItemTemplate = (counter, date) => {

  return `<li class="trip-days__item  day">
    <div class="day__info">
      <span class="day__counter">${counter}</span>
      <time class="day__date" datetime="${date.toISOString().substr(0, 10)}">${date.toLocaleString(`en-US`, {month: `short`, day: `2-digit`})}</time>
    </div>
    <ul class="trip-events__list">
    </ul>
  </li>`;
};

export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  AFTEREND: `afterend`,
  BEFOREEND: `beforeend`
};

export const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
    case RenderPosition.AFTEREND:
      container.after(element);
      break;
  }
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

// export const renderTemplate = (container, template, place) => {
//   container.insertAdjacentHTML(place, template);
// };

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getISOLocalDate = (date) => {
  const timezoneOffset = (new Date()).getTimezoneOffset() * 60000;
  return new Date(date - timezoneOffset).toISOString().slice(0, -8);
};

export const getLocalTime = (date) => {
  return new Date(date).toLocaleString(`en-GB`, {hour: `2-digit`, minute: `2-digit`});
};

export const getFormattedLocalDate = (date) => {
  return new Date(date)
    .toLocaleString(`en-GB`,
        {year: `2-digit`, month: `2-digit`, day: `2-digit`, hour: `2-digit`, minute: `2-digit`})
    .replace(`,`, ``);
};

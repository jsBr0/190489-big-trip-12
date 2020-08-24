export const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getISODate = (date) => {
  return new Date(date).toISOString().slice(0, -8);
};

export const getTime = (date) => {
  return new Date(date).toLocaleString(`en-GB`, {hour: `2-digit`, minute: `2-digit`});
};

export const getFormattedDate = (date) => {
  return new Date(date)
    .toLocaleString(`en-GB`,
        {year: `2-digit`, month: `2-digit`, day: `2-digit`, hour: `2-digit`, minute: `2-digit`})
    .replace(`,`, ``);
};

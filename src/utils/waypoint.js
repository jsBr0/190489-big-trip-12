export const getISOLocalDate = (date) => {
  const timezoneOffset = (new Date()).getTimezoneOffset() * 60000;
  return new Date(date - timezoneOffset).toISOString();
};

export const getLongLocalDate = (date) => {
  return new Date(date)
    .toLocaleString(`en-GB`,
        {year: `2-digit`, month: `2-digit`, day: `2-digit`, hour: `2-digit`, minute: `2-digit`})
    .replace(`,`, ``);
};

export const getShortLocalDate = (date) => {
  return new Date(date)
    .toLocaleString(`en-US`, {month: `short`, day: `2-digit`});
};

export const getLocalTime = (date) => new Date(date).toLocaleString(`en-GB`, {hour: `2-digit`, minute: `2-digit`});

export const getTimeDiff = (eventEnd, eventStart) => {
  let diff = (eventEnd.getTime() - eventStart.getTime()) / 1000;

  diff /= 60;

  return Math.abs(Math.round(diff));
};

export const sortWaypointsByPrice = (eventA, eventB) => {
  return eventB.cost - eventA.cost;
};

export const sortWaypointsByTime = (eventA, eventB) => {
  return getTimeDiff(eventB.schedule.end, eventB.schedule.start) - getTimeDiff(eventA.schedule.end, eventA.schedule.start);
};



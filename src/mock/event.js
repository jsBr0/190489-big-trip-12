import {getRandomInteger} from "../utils/common.js";
import {EVENT_TYPES, DESTINATIONS, OFFERS, DESCRIPTION_TEMPLATE} from "../const.js";

const DAYS_GAP = 7;
const MAX_SENTENCES_NUM = 5;
const MAX_IMAGES_NUM = 2;
const MIN_COST_VALUE = 100;
const MAX_COST_VALUE = 300;

const generateType = () => {
  const randomIndex = getRandomInteger(0, EVENT_TYPES.length - 1);

  return EVENT_TYPES[randomIndex];
};

const generateDestination = () => {
  const randomIndex = getRandomInteger(0, DESTINATIONS.length - 1);

  return DESTINATIONS[randomIndex];
};

const generateSchedule = () => {
  const startDate = new Date();

  const randomDaysGap = getRandomInteger(-DAYS_GAP, DAYS_GAP);

  startDate.setDate(startDate.getDate() + randomDaysGap);

  const endDate = new Date(startDate);

  const randomMinutesGap = getRandomInteger(1, 180);

  endDate.setMinutes(endDate.getMinutes() + randomMinutesGap);

  return {
    start: startDate,
    end: endDate
  };
};

const generateOffers = () => OFFERS;

const generateDescription = (num) => {
  const description = DESCRIPTION_TEMPLATE
    .split(`. `)
    .map((item) => {
      if (!item.endsWith(`.`)) {
        return item + `.`;
      } else {
        return item;
      }
    })
    .sort(() => Math.random() - 0.5)
    .slice(0, getRandomInteger(1, num))
    .join(` `);

  return description;
};

const generatePhotos = (num) => {
  const generateRandomPhotoLink = () => {
    return `http://picsum.photos/248/152?r=${Math.random()}`;
  };

  const photos = [];

  for (let i = 0; i < num; i++) {
    photos.push(generateRandomPhotoLink());
  }

  return photos;
};

export const generateEvent = () => {
  return {
    type: generateType(),
    destination: generateDestination(),
    schedule: generateSchedule(),
    cost: getRandomInteger(MIN_COST_VALUE, MAX_COST_VALUE),
    offers: generateOffers(),
    info: {
      description: generateDescription(MAX_SENTENCES_NUM),
      photos: generatePhotos(MAX_IMAGES_NUM),
    },
  };
};

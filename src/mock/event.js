import {getRandomInteger} from "../utils.js";
import {EVENT_TYPES, DESTINATIONS, OFFERS, DESCRIPTION_TEMPLATE} from "../const.js";

const MAX_SENTENCES_COUNT = 5;
const MAX_IMAGES_COUNT = 2;
const MIN_PRICE = 100;
const MAX_PRICE = 300;

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

  const randomDaysGap = getRandomInteger(-7, 7);

  startDate.setDate(startDate.getDate() + randomDaysGap);

  const endDate = new Date(startDate);

  const randomMinutesGap = getRandomInteger(1, 60);

  endDate.setMinutes(endDate.getMinutes() + randomMinutesGap);

  return {
    start: startDate,
    end: endDate
  };
};

const generateOffers = () => {
  return OFFERS;
};

const generateDescription = (qty) => {
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
    .slice(0, getRandomInteger(1, qty))
    .join(` `);

  return description;
};

const generatePhotos = (qty) => {
  const generatePhotoLink = () => {
    return `http://picsum.photos/248/152?r=${Math.random()}`;
  };

  const photos = [];

  for (let i = 0; i < qty; i++) {
    photos.push(generatePhotoLink());
  }

  return photos;
};

export const generateEventData = () => {
  return {
    type: generateType(),
    destination: generateDestination(),
    schedule: generateSchedule(),
    price: getRandomInteger(MIN_PRICE, MAX_PRICE),
    offers: generateOffers(),
    info: {
      description: generateDescription(MAX_SENTENCES_COUNT),
      photos: generatePhotos(MAX_IMAGES_COUNT),
    },
  };
};

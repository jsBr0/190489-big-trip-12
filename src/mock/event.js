import {getRandomInteger} from "../utils.js";

const MAX_SENTENCES_COUNT = 5;
const MAX_IMAGES_COUNT = 2;
const MIN_PRICE = 100;
const MAX_PRICE = 300;

const generateTypes = () => {
  const types = [
    {group: `Transfer`, title: `Taxi`},
    {group: `Transfer`, title: `Bus`},
    {group: `Transfer`, title: `Train`},
    {group: `Transfer`, title: `Ship`},
    {group: `Transfer`, title: `Transport`},
    {group: `Transfer`, title: `Drive`},
    {group: `Transfer`, title: `Flight`},
    {group: `Activity`, title: `Check-in`},
    {group: `Activity`, title: `Sightseeing`},
    {group: `Activity`, title: `Restaurant`}
  ];

  const randomIndex = getRandomInteger(0, types.length - 1);

  return types[randomIndex];
};

const generateDestinations = () => {
  const destinations = [`Kyiv`, `Kharkiv`, `Odessa`, `Dnipro`, `Zaporizhzhya`, `Lviv`];

  const randomIndex = getRandomInteger(0, destinations.length - 1);

  return destinations[randomIndex];
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
  const offers = [
    {key: `luggage`, title: `Add luggage`, price: `30`},
    {key: `comfort`, title: `Switch to comfort class`, price: `100`},
    {key: `meal`, title: `Add meal`, price: `15`},
    {key: `seats`, title: `Choose seats`, price: `5`},
    {key: `train`, title: `Travel by train`, price: `40`}
  ];

  return offers;
};

const generateDescription = (qty) => {
  const template = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;

  const description = template
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
    types: generateTypes(),
    destinations: generateDestinations(),
    schedule: generateSchedule(),
    price: getRandomInteger(MIN_PRICE, MAX_PRICE),
    offers: generateOffers(),
    info: {
      description: generateDescription(MAX_SENTENCES_COUNT),
      photos: generatePhotos(MAX_IMAGES_COUNT),
    },
  };
};

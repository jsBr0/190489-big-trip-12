const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const generateType = () => {
  const types = [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`, `Check-in`, `Sightseeng`, `Restaurant`];

  return types;
};

const generateDestination = () => {
  const destinations = [`Amsterdam`, `Chamonix`, `Geneva`, `Saint Petersburg`];

  return destinations;
};

const generateStartDate = () => {
  const startDate = new Date();

  return startDate;
};

const generateEndDate = () => {
  const endDate = new Date();

  return endDate;
};

const generateOffer = () => {
  const offers = [
    {key: `luggage`, title: `Add luggage`, price: `30`},
    {key: `comfort`, title: `Switch to comfort class`, price: `100`},
    {key: `meal`, title: `Add meal`, price: `15`},
    {key: `seats`, title: `Choose seats`, price: `5`},
    {key: `train`, title: `Travel by train`, price: `40`}
  ];

  return offers;
};

const generateDescription = () => {
  const text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;

  const descriptions = text.split(`.`)
  .slice(0, length - 1)
  .map((e) => {
    if (e.startsWith(` `)) {
      return e.substr(1) + `.`;
    } else {
      return e + `.`;
    }
  });

  console.log(descriptions);

  const randomIndex = getRandomInteger(0, descriptions.length - 1);

  return descriptions[randomIndex];
};

export const generateTrip = () => {
  return {
    type: generateType(),
    destination: generateDestination(),
    start: generateStartDate(),
    end: generateEndDate(),
    price: null, // ??? Стоимость. Целое число.
    offer: generateOffer(),
    info: {
      description: generateDescription(),
      photo: `http://picsum.photos/248/152?r=${Math.random()}`,
    }
  };
};

import faker from 'faker';

faker.seed(4);

const data = [];

for (let i = 0; i < 20; i++) {
  data.push({ id: i, ...faker.helpers.contextualCard() });
}

export default data;

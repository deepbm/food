import axios from 'axios';

export async function getFoods(sort = 'createdAt') {
  const { data } = await axios.get('data/mock.json');
  data.sort((a, b) => b[sort] - a[sort]);

  return data;
}

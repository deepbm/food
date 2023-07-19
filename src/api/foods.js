import axios from 'axios';

export async function getFoods() {
  const { data } = await axios.get('data/mock.json');
  return data;
}

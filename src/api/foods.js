import axios from 'axios';

export async function getFoods(sort = 'createdAt') {
  const { data } = await axios.get(`https://learn.codeit.kr/3507/foods?order=${sort}`);
  return data;
}

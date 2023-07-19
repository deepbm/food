import axios from 'axios';

export async function getFoods(sort = 'createdAt', limit = 10, { pageParam }) {
  let fetchUrl = `https://learn.codeit.kr/api/foods?order=${sort}&limit=${limit}`;
  if (pageParam) {
    fetchUrl = `https://learn.codeit.kr/api/foods?cursor=${pageParam}&limit=${limit}`;
  }
  const { data } = await axios.get(fetchUrl);
  return data;
}

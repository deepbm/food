import axios from 'axios';

export async function getFoods(sort = 'createdAt', limit = 10, keyword, { pageParam }) {
  let fetchUrl = `https://learn.codeit.kr/api/foods?order=${sort}&limit=${limit}`;
  if (keyword) {
    fetchUrl = `https://learn.codeit.kr/api/foods?limit=2&search=${keyword}`;
    if (pageParam) {
      fetchUrl = `https://learn.codeit.kr/api/foods?cursor=${pageParam}&limit=${limit}&search=${keyword}`;
    }
  }
  const { data } = await axios.get(fetchUrl);
  return data;
}

import axios from 'axios';

const BASE_URL = 'https://learn.codeit.kr/api';

export async function getFoods(sort = 'createdAt', limit = 10, keyword, { pageParam }) {
  let fetchUrl = `${BASE_URL}/foods?order=${sort}&limit=${limit}`;
  if (keyword) {
    fetchUrl = `${BASE_URL}/foods?limit=2&search=${keyword}`;
    if (pageParam) {
      fetchUrl = `${BASE_URL}/foods?cursor=${pageParam}&limit=${limit}&search=${keyword}`;
    }
  }
  const { data } = await axios.get(fetchUrl);
  return data;
}

export async function addFood(formData) {
  return axios
    .post(`${BASE_URL}/foods`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
    .then(res => res.data.food)
    .catch(error => {
      throw new Error('데이터를 생성하는데 실패했습니다.');
    });
}

export async function updateFood(id, formData) {
  return axios
    .put(`${BASE_URL}/foods/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    .then(res => res.data.food)
    .catch(error => {
      throw new Error('데이터를 수정하는데 실패했습니다.');
    });
}

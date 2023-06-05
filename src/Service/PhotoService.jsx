import axios from 'axios';

const API_KEY = '36273406-0811d437cd9f21d86ea104e56';
axios.defaults.baseURL = 'https://pixabay.com/api/';
// axios.defaults.key = API_KEY;
axios.defaults.params = {
  key: API_KEY,
  per_page: 12,
  orientation: 'horizontal',
  image_type: 'photo',
};

export const getPhotos = async (query, page) => {
  const { data } = await axios.get(`?q=${query}&page=${page}`);

  return data;
};

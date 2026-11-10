import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '58458623-45cf95d8b38ef2b39b6885d94';

export const getImagesByQuery = async (query, page) => {
  const response = await axios.get(BASE_URL, {
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: page,
      per_page: 15,
    },
  });
  return response.data;
};


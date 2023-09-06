import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '38400655-50a1fa45dda9b327a83dd0d24';
export const PER_PAGE = 12;

export async function getImages(query, page) {
  const separatorIndex = query.indexOf('/');
  const parcedQuery = query.slice(separatorIndex + 1, query.length);
  return axios.get(
    `${BASE_URL}?key=${API_KEY}&q=${parcedQuery}&per_page=${PER_PAGE}&page=${page}`
  );
}

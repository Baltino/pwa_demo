import axios from 'axios';

const URL = 'https://api.giphy.com/v1/gifs/search';
const API_KEY = 'HIkq7qaIstScFre01MaomnhGDHMYAmPt';

export const fetchAlert = async (query) => {
  const { data } = await axios.get(URL, {
    params: {
      q: query,
      api_key: API_KEY,
      limit: 10
    }
  });
  return data.data[0];
}
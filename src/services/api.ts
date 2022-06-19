import axios from 'axios';

const baseURL = 'https://api.nomics.com/v1/currencies/ticker';

export default axios.create({
  method: 'GET',
  baseURL,
  responseType: 'json',
  params: {
    key: process.env.VUE_APP_API_KEY,
  },
});

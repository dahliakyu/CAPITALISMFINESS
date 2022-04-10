import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://dummyjson.com/products',
  timeout: 1000
});

export default apiClient;
/* eslint-disable max-len */
import axios from 'axios';

const BASE_URL = 'https://frontend-test-assignment-api.abz.agency/api/v1';

export const getUsers = (dataType: string) => {
  return axios.get(`${BASE_URL}/${dataType}`)
    .then(response => response.data.users);
};

export const getPositions = (dataType: string) => {
  return axios.get(`${BASE_URL}/${dataType}`)
    .then(response => response.data.positions);
};

export const getToken = () => {
  return axios.get(
    `${BASE_URL}/token`,
  )
    .then(response => response.data.token);
};

export const postUser = (dataType: string, user: FormData, token: string) => {
  return axios.post(
    `${BASE_URL}/${dataType}`,
    user,
    { headers: { Token: token } },
  )
    .then(response => response.data);
};

import axios from 'axios';
import qs from 'qs';
import appendQuery from '../helpers/appendQuery';
import { appUri } from '../config';

const baseUri = `${appUri}/api`;
const proxyOptions = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

const get = (url, data, isFinalUrl) => {
  const finalUrl = isFinalUrl ? url : baseUri + url;
  const param = data ? qs.stringify(data) : '';
  const fullUri = appendQuery(finalUrl, param);
  return new Promise((resolve) => {
    axios.get(fullUri, isFinalUrl ? {} : proxyOptions)
      .then(response => resolve(response))
      .catch(error => resolve(error.response));
  });
};

const post = (url, body, isFinalUrl) => {
  const finalUrl = isFinalUrl ? url : baseUri + url;
  return new Promise((resolve) => {
    axios.post(finalUrl, body, isFinalUrl ? {} : proxyOptions)
      .then(response => resolve(response))
      .catch(error => resolve(error.response));
  });
};

const remove = (url, body, isFinalUrl) => {
  const finalUrl = isFinalUrl ? url : baseUri + url;
  return new Promise((resolve) => {
    axios.delete(finalUrl, Object.assign({
      data: body,
    }, isFinalUrl ? {} : proxyOptions)).then(response => resolve(response))
     .catch(error => resolve(error.response));
  });
};

const update = (url, body) => axios.put(baseUri + url, body, proxyOptions)
  .catch(error => error.response);

const setAuthToken = (token) => {
  if (token) axios.defaults.headers.Authorization = token;
  else delete axios.defaults.headers.Authorization;
};


export default {
  get,
  post,
  update,
  remove,
  setAuthToken,
};

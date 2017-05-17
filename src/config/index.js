/* eslint-disable */
const env = process.env.NODE_ENV || 'development';

export default {
  baseAPIUri: process.env.API_URL || 'https://example-api.com',
  appUri: process.env.APP_URL || 'http://localhost:3000',
};

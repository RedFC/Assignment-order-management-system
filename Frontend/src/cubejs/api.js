import cubejs from '@cubejs-client/core';

const CUBEJS_API_URL = process.env.CUBEJSURL; // Replace with your Cube.js API URL
const CUBEJS_TOKEN = process.env.CUBEJSTOKEN; // Replace with your Cube.js API token

const cubejsApi = cubejs(CUBEJS_TOKEN, {
  apiUrl: CUBEJS_API_URL,
});

export default cubejsApi;

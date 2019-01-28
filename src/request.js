const fetch = require('node-fetch');

async function request({ url, method, headers, body }) {
  // eslint-disable-next-line no-undef
  try {
    let response = {};
    if (method === 'GET') {
      response = await fetch(url, { method, headers });
    } else {
      response = await fetch(url, { method, headers, body });
    }

    const responseJson = await response.json();

    return responseJson;
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = request;

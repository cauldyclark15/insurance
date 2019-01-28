const { URLSearchParams } = require('url');

const request = require('./request');

async function authenticate() {
  const headers = {
    Authorization: 'Basic QXd3bFpFaUFBcEhURDNDNHVrYW46cEVKRVJMZElIdFJLeWtEY3N4YjVidzA3czBSanJPVVJ3TndHZmt5dA==',
    'Content-Type': 'application/x-www-form-urlencoded',
  };
  const method = 'POST';

  let params = new URLSearchParams();
  params.append('grant_type', 'client_credentials');

  const responseJson = await request({
    url: 'https://platform.pokitdok.com/oauth2/token',
    headers,
    method,
    body: params,
  });

  const { access_token } = responseJson;

  // eslint-disable-next-line no-undef
  return access_token;
}

module.exports = authenticate;

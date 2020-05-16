const { URL, URLSearchParams } = require('url');

const fetchActivationMetafield = async (accessToken, shop) => {
  const url = new URL(`https://${shop}/admin/api/${process.env.API_VERSION}/metafields.json`);
  url.search = new URLSearchParams({
    namespace: "property_manager_936",
    key: "enabled",
  }).toString();

  const request = await fetch(url.toString(), {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': accessToken,
    },
  });

  const response = await request.json();
  return response.metafields[0];
};

module.exports = fetchActivationMetafield;
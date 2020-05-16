const fetchActivationMetafield = require('./fetchActivationMetafield');
const createActivationMetafield = require('./createActivationMetafield');

const updateExistingMetafield = async (accessToken, shop, metafieldId, enable) => {
  const request = await fetch(`https://${shop}/admin/api/${process.env.API_VERSION}/metafields/${metafieldId}.json`, {
    method: 'put',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': accessToken,
    },
    body: JSON.stringify({
      metafield: {
        value: enable ? 'true' : 'false',
      },
    }),
  });

  return request.json();
};

const changeActivationMetafieldStatus = async (accessToken, shop, enable) => {
  const metafield = await fetchActivationMetafield( accessToken, shop);

  return metafield
    ? await updateExistingMetafield(accessToken, shop, metafield.id, enable)
    : await createActivationMetafield(accessToken, shop);
};

module.exports = changeActivationMetafieldStatus;
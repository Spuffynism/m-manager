const createActivationMetafield = async (accessToken, shop) => {
  const request = await fetch(`https://${shop}/admin/api/${process.env.API_VERSION}/metafields.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': accessToken,
    },
    body: JSON.stringify({
      metafield: {
        namespace: "property_manager_936",
        key: "enabled",
        value: "true",
        value_type: "string",
      },
    }),
  });

  return request.json();
};

module.exports = createActivationMetafield;
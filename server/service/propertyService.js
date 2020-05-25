const metafieldCreationQuery = JSON.stringify({
  query: `mutation($input: ProductInput!) {
  productUpdate(input: $input) {
    product {
      metafields(first: 100) {
        edges {
          node {
            id
            namespace
            key
            value
          }
        }
      }
    }
  }`,
});

module.exports = {
  createPropertyForProduct: async (property, product) => {
    const response = await fetch(`https://${shop}/admin/api/${process.env.API_VERSION}/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': accessToken,
      },
      body: metafieldCreationQuery
    });

    const responseJson = await response.json();

    console.log('metafield creation response', responseJson.data.appSubscriptionCreate.userErrors);

    const subscription = responseJson.data.appSubscriptionCreate;

    console.log('subscription', subscription.appSubscription);
    return subscription.confirmationUrl;
  },
};
/**
 * @param accessToken
 * @param shop
 * @returns {String}
 */
const fetchSubscriptionUrl = async (accessToken, shop) => {
  const appSubscriptionCreateQuery = JSON.stringify({
    query: `mutation {
      appSubscriptionCreate(
          name: "Test plan"
          returnUrl: "${process.env.HOST}"
          test: true
          lineItems: [
          {
            plan: {
              appUsagePricingDetails: {
                  cappedAmount: { amount: 10, currencyCode: USD }
                  terms: "$1 for 1000 properties"
              }
            }
          }
          {
            plan: {
              appRecurringPricingDetails: {
                  price: { amount: 10, currencyCode: USD }
              }
            }
          }
          ]
        ) {
            userErrors {
              field
              message
            }
            confirmationUrl
            appSubscription {
              status
              id
            }
        }
    }`
  });

  const response = await fetch(`https://${shop}/admin/api/${process.env.API_VERSION}/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': accessToken,
    },
    body: appSubscriptionCreateQuery
  });

  const responseJson = await response.json();

  console.log('subscription response', responseJson.data.appSubscriptionCreate.userErrors);

  const subscription = responseJson.data.appSubscriptionCreate;

  console.log('subscription', subscription.appSubscription);
  return subscription.confirmationUrl;
};

module.exports = fetchSubscriptionUrl;
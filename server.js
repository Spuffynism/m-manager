require('isomorphic-fetch');
const dotenv = require('dotenv');
const Koa = require('koa');
const next = require('next');
const { default: createShopifyAuth } = require('@shopify/koa-shopify-auth');
const { verifyRequest } = require('@shopify/koa-shopify-auth');
const session = require('koa-session');
const logger = require('koa-logger');

dotenv.config({
  path: `.${process.env.NODE_ENV === 'production' ? '' : process.env.NODE_ENV}.env`,
});

const { default: graphQLProxy } = require('@shopify/koa-shopify-graphql-proxy');
const Router = require('koa-router');
const { registerWebhook, receiveWebhook } = require('@shopify/koa-shopify-webhooks');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const shopService = require('./server/service/shopService');

const fetchSubscriptionUrl = require('./server/fetchSubscriptionUrl');
const changeActivationMetafieldStatus = require('./server/changeActivationMetafieldStatus');

const {
  SHOPIFY_API_SECRET_KEY,
  SHOPIFY_API_KEY,
  HOST,
  API_VERSION,
} = process.env;

const server = new Koa();
const router = new Router();

module.exports = app.prepare()
  .then(() => {
    server.use(session({ secure: true, sameSite: 'none' }, server));
    server.keys = [SHOPIFY_API_SECRET_KEY];

    server.use(logger());

    server.use(
      createShopifyAuth({
        apiKey: SHOPIFY_API_KEY,
        secret: SHOPIFY_API_SECRET_KEY,
        scopes: ['read_products', 'write_products'],
        async afterAuth(ctx) {
          const { shop, accessToken } = ctx.session;

          await shopService.registerNewShop(shop);

          const registration = await registerWebhook({
            address: `${HOST}/webhooks/products/create`,
            topic: 'PRODUCTS_CREATE',
            accessToken,
            shop,
            apiVersion: API_VERSION,
          });

          if (registration.success) {
            console.log('Registered PRODUCTS_CREATE webhook for shop ', shop);
          } else {
            console.log('Failed to register PRODUCTS_CREATE webhook for shop', shop, registration.result.data.webhookSubscriptionCreate.userErrors);
          }

          ctx.cookies.set('shopOrigin', shop, {
            httpOnly: false,
            secure: true,
            sameSite: 'none',
          });

          const url = await fetchSubscriptionUrl(accessToken, shop);
          ctx.redirect(url);
        },
      }),
    );

    // webhook routes
    const webhook = receiveWebhook({ secret: SHOPIFY_API_SECRET_KEY });

    router.post('/webhooks/products/create', webhook, (ctx) => {
      console.log('received product create webhook: ', ctx.state.webhook);
    });

    // api routes
    router.put('/enable', verifyRequest(), async (ctx) => {
      const { shop, accessToken } = ctx.session;

      const enable = true;

      ctx.body = await changeActivationMetafieldStatus(accessToken, shop, enable);
      ctx.res.statusCode = 200;
    });

    router.put('/disable', verifyRequest(), async (ctx) => {
      const { shop, accessToken } = ctx.session;

      const enable = false;

      ctx.body = await changeActivationMetafieldStatus(accessToken, shop, enable);
      ctx.res.statusCode = 200;
    });

    // proxied graphql calls route
    server.use(graphQLProxy({ version: API_VERSION }));

    // all
    router.get('*', verifyRequest(), async (ctx) => {
      console.log('verified request', ctx.req.url);
      await handle(ctx.req, ctx.res);
      ctx.respond = false;
      ctx.res.statusCode = 200;
    });

    server.use(router.allowedMethods());
    server.use(router.routes());

    return server.listen(port, () => {
      console.log(`> Ready on http://localhost:${port}`);
    });
  })
  .catch(console.error);
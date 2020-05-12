require('isomorphic-fetch');
const dotenv = require('dotenv');
const Koa = require('koa');
const next = require('next');
const { default: createShopifyAuth } = require('@shopify/koa-shopify-auth');
const { verifyRequest } = require('@shopify/koa-shopify-auth');
const session = require('koa-session');

dotenv.config();

const { default: graphQLProxy } = require('@shopify/koa-shopify-graphql-proxy');
const Router = require('koa-router');
const { registerWebhook, receiveWebhook } = require('@shopify/koa-shopify-webhooks');

const getSubscriptionUrl = require('./server/getSubscriptionUrl');
const changeActivationMetafieldStatus = require('./server/changeActivationMetafieldStatus');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const {
  SHOPIFY_API_SECRET_KEY,
  SHOPIFY_API_KEY,
  HOST,
  API_VERSION,
} = process.env;

app.prepare().then(() => {
  const server = new Koa();
  const router = new Router();
  server.use(session({ secure: true, sameSite: 'none' }, server));
  server.keys = [SHOPIFY_API_SECRET_KEY];

  server.use(
    createShopifyAuth({
      apiKey: SHOPIFY_API_KEY,
      secret: SHOPIFY_API_SECRET_KEY,
      scopes: ['read_products', 'write_products'],
      async afterAuth(ctx) {
        const { shop, accessToken } = ctx.session;
        ctx.cookies.set('shopOrigin', shop, {
          httpOnly: false,
          secure: true,
          sameSite: 'none',
        });

        const registration = await registerWebhook({
          address: `${HOST}/webhooks/products/create`,
          topic: 'PRODUCTS_CREATE',
          accessToken,
          shop,
          apiVersion: API_VERSION,
        });

        if (registration.success) {
          console.log('Successfully registered product creation webhook');
        } else {
          console.log('Failed to register product creation webhook', registration.result);
        }

        await getSubscriptionUrl(ctx, accessToken, shop);
      },
    }),
  );

  const webhook = receiveWebhook({ secret: SHOPIFY_API_SECRET_KEY });

  router.post('/webhooks/products/create', webhook, (ctx) => {
    console.log('received product create webhook: ', ctx.state.webhook);
  });

  router.put('/enable', verifyRequest(), async (ctx) => {
    const { shop, accessToken } = ctx.session;

    const enable = true;

    ctx.body = await changeActivationMetafieldStatus(ctx, accessToken, shop, enable);
    ctx.res.statusCode = 200;
  });

  router.put('/disable', verifyRequest(), async (ctx) => {
    const { shop, accessToken } = ctx.session;

    const enable = false;

    ctx.body = await changeActivationMetafieldStatus(ctx, accessToken, shop, enable);
    ctx.res.statusCode = 200;
  });

  server.use(graphQLProxy({ version: API_VERSION }));
  router.get('*', verifyRequest(), async (ctx) => {
    console.log('verified request', ctx.req.url);
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
    ctx.res.statusCode = 200;
  });

  server.use(router.allowedMethods());
  server.use(router.routes());

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
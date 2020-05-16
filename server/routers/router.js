const Router = require('koa-router');
const { verifyRequest } = require('@shopify/koa-shopify-auth');
const propertiesRouter = require('properties');
const propertyGroupsRouter = require('propertyGroups');
const shopsRouter = require('shops');

function createRouter(prefix) {

  const router = new Router({
    prefix,
  });
  router.use(verifyRequest());

  return router;

}

const router = new Router({
  prefix: '/api',
});

propertyGroupsRouter
  .use(propertiesRouter.routes(), propertiesRouter.allowedMethods());

shopsRouter
  .use(propertyGroupsRouter.routes(), propertyGroupsRouter.allowedMethods());

router
  .use(shopsRouter.routes(), shopsRouter.allowedMethods());

router.get('/', (ctx) => {
  return ({ status: 'ok' })
})

module.exports = {
  createRouter,
  router,
};

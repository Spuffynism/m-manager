const { createRouter } = require('router');
const shopService = require('../service/shopService');

const router = createRouter('/shops');

router
  .get('/:url', async (ctx) => {
    const url = ctx.params.url;

    return await shopService.fetchByUrl(url);
  });

module.exports = router;
const { createRouter } = require('router');
const propertyService = require('../service/propertyService');

const router = createRouter('/properties');

router
  .get('/', (ctx) => {
    ctx.body = 'Hello World!';
  })
  .post('/', (ctx) => {

  })
  .put('/:id', (ctx) => {
    const id = ctx.params.id;
  })
  .delete('/:id', (ctx) => {
    const id = ctx.params.id;
  });

module.exports = router;
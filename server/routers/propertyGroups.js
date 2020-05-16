const { createRouter } = require('router');
const propertyGroupService = require('../service/propertyGroupService');

const router = createRouter('/groups');

router
  .get('/', (ctx) => {
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
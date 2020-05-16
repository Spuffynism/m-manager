const { expect } = require('chai');

describe('app', async () => {
  let app;

  before(async () => {
    app = await require('../../server');
  });

  after(() => {
    app.close();
  })

  it('registers session middleware', async () => {
    throw 'Not implemented';
  });

  it('registers logging middleware', async () => {
    throw 'Not implemented';
  });

  it('registers shopify auth middleware', async () => {
    throw 'Not implemented';
  });

  it('registers graphql proxy', async () => {
    throw 'Not implemented';
  });

  it('registers api routes', async () => {
    throw 'Not implemented';
  });
});
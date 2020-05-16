const fetch = require('node-fetch');
const { expect } = require('chai');

describe('app', async () => {
  let app;

  after(() => {
    app.close();
  })

  it('starts app on port', async () => {
    app = await require('../../server');

    const response = await fetch(`http://127.0.0.1:${process.env.PORT}`);

    expect(response.redirected).to.be.true;
  }).timeout(30_000);
});
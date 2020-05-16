const { expect } = require('chai');

describe('app', async () => {
  let app;

  after(() => {
    app.close();
  })

  it('pulls test environment', async () => {
    app = await require('../../server');
    expect(process.env.SHOPIFY_API_KEY).to.be.equal('test_shopify_api_key');
    expect(process.env.SHOPIFY_API_SECRET_KEY).to.be.equal('shpss_test_shopify_api_secret_key');
    expect(process.env.HOST).to.be.equal('https://testhost.example.com');
    expect(process.env.API_VERSION).to.be.equal('2020-04');
    expect(parseInt(process.env.PORT, 10)).to.be.equal(6532)
  });
});
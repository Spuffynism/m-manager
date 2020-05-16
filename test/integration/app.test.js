process.env.PORT = 6532;

const { expect } = require('chai');
const request = require('supertest');
const url = require('url');

const appPromise = require('../../server');

describe('app', async () => {
  let app,
    agent;

  before(async () => {
    app = await appPromise;
    agent = request.agent(app);
  });

  after(async () => {
    app.close()
  })

  describe('GET /', () => {
    it('redirects to auth', async () => {
      return await agent
        .get('/')
        .expect(302)
        .expect('Location', '/auth');
    });
  });

  describe('GET /auth', () => {
    it('asks for shop parameter when none is provided', async () => {
      return await agent
        .get('/auth')
        .expect(400)
        .expect((res) => {
          expect(res.text).to.be.equal('Expected a valid shop query parameter');
        });
    });

    it('continues auth when shop is provided', async () => {
      return await agent
        .get('/auth?shop=test.myshopify.com')
        .expect(200)
        .expect((res) => {
          expect(res.text).to.not.be.empty;
        });
    });

    describe('GET /inline', () => {
      it('asks for shop parameter when none is provided', async () => {
        return await agent
          .get('/auth/inline')
          .expect(400)
          .expect((res) => {
            expect(res.text).to.be.equal('Expected a valid shop query parameter');
          });
      });

      it('redirects to shop for allowing app when shop is provided', async () => {
        return await agent
          .get('/auth/inline?shop=test.myshopify.com')
          .expect(302)
          .expect((res) => {
            const parseQueryString = true;
            const location = url.parse(res.headers.location, parseQueryString);
            console.log(location.query);

            expect(location.query.scope).to.be.equal('read_products, write_products');
            //expect(location.query.client_id).to.be.equal('test_shopify_api_key');
            expect(location.query.redirect_uri).to.be.equal(`https://127.0.0.1:${process.env.PORT}/auth/callback`);
          });
      });
    });
  });
});

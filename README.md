# Running

## app
npm run dev

## heroku
heroku local web --port=3000

## database
 ./pg_ctl.exe -D "C:\Program Files\PostgreSQL\12\data" start

## Setup

Create a .env file with this structure:

```
SHOPIFY_API_KEY=KEY
SHOPIFY_API_SECRET_KEY=SECRET
HOST='HTTPS_URL'
API_VERSION='YYYY-MM'
DATABASE_URL=
```

## Tests

https://github.com/zeit/next.js/issues/1300#issuecomment-282910431

## Install

Install app with `https://1f1f4614.ngrok.io/auth?shop=9362.myshopify.com`

### Authentifying

https://0641ebf8.ngrok.io/auth?shop=9362.myshopify.com

### Next steps

- ~~Complete tutorial~~
- ~~Enable activation by metafield~~
- Write some integration tests
- Make the backend hot-reloadable
- Create database with linked shop informations
- Make use of different env configuration files
- Use eslint
- Save input property to product
    - Make it have a label, a name, a placeholder and a class
- Save radio property to product
- Save swatch property to product
- Save dropdown property to product
- Save property group to list of products
- Save multiselect property to product
- Save property group to collection
- Save property group to products of tag
- Listen to uninstall 
- Install on install
- Make sure subscription is active (https://shopify.dev/docs/admin-api/graphql/reference/object/appinstallation?api[version]=2020-04)


Writing unit tests is left as an exercise to the reader.
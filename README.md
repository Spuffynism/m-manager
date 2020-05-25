# Running

## app
npm run dev

## heroku

heroku local web --port=3000

## database

### Creating database

1. Install postgresql
2. Start postgresql
3. `npm run migrate:up`

### Start

c:/Program\ Files/PostgreSQL/12/bin/pg_ctl.exe -D "C:\Program Files\PostgreSQL\12\data" start

### Stop

c:/Program\ Files/PostgreSQL/12/bin/pg_ctl.exe -D "C:\Program Files\PostgreSQL\12\data" stop

## Setup

Create a .env file with this structure:

```
HOST='HTTPS_URL'
SHOPIFY_API_KEY=KEY
SHOPIFY_API_SECRET_KEY=SECRET
API_VERSION='YYYY-MM'

DB_USER=user
DB_PASSWORD=password
DB_DATABASE=database_name
DB_HOST=localhost
DB_PORT=port
```

## Tests

https://github.com/zeit/next.js/issues/1300#issuecomment-282910431

## Install

https://c91db50c.ngrok.io/auth?shop=9362.myshopify.com

### Next steps

- ~~Complete tutorial~~
- ~~Enable activation by metafield~~
- ~~Write some integration tests~~
- Make the backend hot-reloadable
- ~~Create database with linked shop informations~~
- ~~Make use of different env configuration files~~
- Use eslint
- Allow adding of property to product
- Allow modifying property metafield
- Save input property to product
    - Make it have a label, a name, a type, a placeholder and a class
- Add validation to form fields
- Save radio property to product
- Save swatch property to product
- Save dropdown property to product
- Save property group to list of products
- Save multiselect property to product
- Save property group to collection
- Save property group to products of tag
- Listen to uninstall 
- Install on install
    - Register webhooks after subscription activated
- Make sure subscription is active (https://shopify.dev/docs/admin-api/graphql/reference/object/appinstallation?api[version]=2020-04)
- Move individual functions in server to services
- Move all routes to their respective files
- Write some more integration tests
- Detect when app is already installed
- Do routing locally - without rendering it server-side


Writing unit tests is left as an exercise to the reader.
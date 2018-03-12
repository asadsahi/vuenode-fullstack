# Vue Node Fullstack

Fullstack application built using Vue and NodeJs with server side rendering.

## Features

- Full features SPA + PWA with SSR
- Frontend (Vue)
- Backend (Express)
- ORM (Sequelize)
- DB (All databases supported by sequelize e.g MySql, MSSql, Sqlite, PostgreSQL)
- Login & Registration features
- JWT based authentication
- Server Side Rendering
  - Vue + vue-router + vuex working together
  - Server-side data pre-fetching
  - Client-side state & DOM hydration
  - Automatically inlines CSS used by rendered components only
  - Preload / prefetch resource hints
  - Route-level code splitting
- Progressive Web App
  - App manifest
  - Service worker
  - 100/100 Lighthouse score
- Single-file Vue Components
  - Hot-reload in development
  - CSS extraction for production
- Animation
  - Effects when switching route views
- Unit testing
  - Using [Jest](https://facebook.github.io/jest/)
- E2E testing
  - Using [Testcafe](https://devexpress.github.io/testcafe/)
- Examples
  - Read to roll examples for any project

## Architecture Overview

<img width="973" alt="screen shot 2016-08-11 at 6 06 57 pm" src="https://cloud.githubusercontent.com/assets/499550/17607895/786a415a-5fee-11e6-9c11-45a2cfdf085c.png">

**A detailed Vue SSR guide can be found [here](https://ssr.vuejs.org).**

## Build Setup

**Requires Node.js 8+**

``` bash
# install dependencies
npm install # or yarn

# serve in dev mode, with hot reload at localhost:3000
npm run dev # or yarn dev

# build for production
npm run build:prod # or yarn build:prod

# serve in production mode
npm start # or yarn start

# serve through ngrok tunnel
# Details: (this gives an external url to browse from internet for the purpose of testing while developing locally without deploying to server)
## Dev
npm run dev:tunnel # or yarn dev:tunnel
## Prod
npm run prod:tunnel # or yarn prod:tunnel

# run unit tests
## single run
npm test # or yarn test
## watch mode
npm run test:watch # or yarn test:watch

# end-to-end tests
# start server
npm run dev # or yarn dev

## single run
npm run e2e # or yarn e2e
## watch mode
npm run e2e:watch # or yarn e2e:watch
```

## Credist

Kudos to [vue-hackernews-2.0](https://github.com/vuejs/vue-hackernews-2.0) on which this project is based on.

## License

MIT

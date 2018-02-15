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
  - Real-time list updates with FLIP Animation

## Architecture Overview

<img width="973" alt="screen shot 2016-08-11 at 6 06 57 pm" src="https://cloud.githubusercontent.com/assets/499550/17607895/786a415a-5fee-11e6-9c11-45a2cfdf085c.png">

**A detailed Vue SSR guide can be found [here](https://ssr.vuejs.org).**

## Build Setup

**Requires Node.js 7+**

``` bash
# install dependencies
npm install # or yarn

# serve in dev mode, with hot reload at localhost:8080
npm run dev # or yarn dev

# build for production
npm run build # or yarn build

# serve in production mode
npm start # or yarn start
```

## Credist

Kudos to [vue-hackernews-2.0](https://github.com/vuejs/vue-hackernews-2.0) on which this project is based on.

## License

MIT

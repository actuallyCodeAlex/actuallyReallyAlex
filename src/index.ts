// TODO: Cypress Configuration
// TODO: Changelog Configuration
// TODO: Postman Documentation of API
// TODO: Documentation Site
// TODO: Hosting Configuration
// TODO: Live Prod Deploy v1.0.0

import Koa from 'koa';
import Pug from 'koa-pug';
import router from 'koa-router';
import fs from 'fs';
import path from 'path';
const app = new Koa();

const pug = new Pug({
  viewPath: './src/views',
  basedir: './src/views',
  app,
})

// logger

app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get('X-Response-Time');
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

// x-response-time

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

// response

app.use(async (ctx, next) => {
  await ctx.render('home');
});

const _ = new router();

app.use(_.routes());

app.listen(3000);

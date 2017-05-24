/* eslint-disable no-console */
import React from 'react';
import { renderToString, extractModules } from 'react-router-server';
import { ServerRouter, createServerRenderContext } from 'react-router';
import express from 'express';
import session from 'express-session';
import connectRedis from 'connect-redis';
import bodyParser from 'body-parser';
import path from 'path';
import compression from 'compression';
import favicon from 'serve-favicon';
import Helmet from 'react-helmet';
import { fromJS } from 'immutable';
import assets from './build/assets.json';
import { RootContainer } from './src/containers/';
import configureStore from './src/store';
import { get, post } from './src/api';
import { Urls } from './src/helpers';
import Config from './src/config';
import redis from 'redis';
import proxy from 'http-proxy-middleware';

const port = 3000;
const app = express();
const redisUrl = process.env.REDIS_URL || 'redis://127.0.0.1:6379';
const RedisStore = connectRedis(session);
app.use(session({
  store: new RedisStore({ url: redisUrl }),
  secret: 'somereallyamazingsecrettoken',
  saveUninitialized: false,
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(favicon(path.join(__dirname, 'favicon.ico')));
app.use(compression());
app.use(express.static(path.join(__dirname, 'build'), { maxAge: 2*60*60*1000 })); // caching for 2 hours

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('public/production'));
} else if (process.env.NODE_ENV === 'staging') {
  app.use(express.static('public/staging'));
} else {
  app.use(express.static('public/development'));
}

const RedisClient = redis.createClient(redisUrl);

//this may change when we switch to https
//options for proxy middleware
let options = {
    target: Config.baseAPIUri,
    changeOrigin: true,
    logLevel: 'debug',
    // onProxyReq: function onProxyReq(proxyReq, req, res) {
    //   if (req.session.cookie.expires && req.session.cookie.expires < Date.now()) {
    //     req.session.destroy();
    //   }
    // },
    onError: function onError(err, req, res) {
        console.log('Something went wrong with the proxy middleware.', err)
        res.end();
    }
};

app.use('/api', proxy(options));

app.get('/sitemap.xml', (req, res) => {
  get(`${Config.baseAPIUri}/sitemap.xml`, {}, true).then((response) => {
    res.set('Content-Type', 'application/xml');
    res.send(response.data);
  })
  .catch((err) => {
    console.log(err);
  });
});

app.get('*', (req, res, next) => {
  if (req.headers['x-forwarded-proto'] !== 'https') {
    res.redirect(`https://kinduce.herokuapp.com${req.url}`);
  }
  else {
    next(); /* Continue to other routes if we're not redirecting */
  }
});

app.get('*', (req, res, next) => {
  const context = createServerRenderContext();
  // const { userId, authToken } = req.session;
  let initialState = fromJS({
    notification: {
      notifications: []
    }
  });
  const store = configureStore(initialState);
  const server = (
    <ServerRouter location={req.url} context={context}>
      <RootContainer location={req.url} store={store} />
    </ServerRouter>
  );
  renderToString(server, context)
    .then( ({html, state, modules}) => {
      const head = Helmet.rewind();
      const result = context.getResult();
      if (result.redirect) {
        res.writeHead(301, { Location: result.redirect.pathname });
        res.end();
      } else {
        const jsAssets = [assets.app.js];
        const cssAssets = [assets.app.css];
        if(assets.vendor){
          jsAssets.unshift(assets.vendor.js);
        }
        res.render(
          path.join(__dirname, 'index.ejs'), {
            html,
            head,
            initialState: state,
            modules: null,
            jsAssets,
            cssAssets,
            currentUrl: req.url,
          });
      }
    })
    .catch(err => next(err));
});

app.listen(process.env.PORT || port, () => {
  console.log('Serving now...');
});

var Pusher = require('pusher');

var pusher = new Pusher({
  appId: '341108',
  key: '4c6aba2e7cad38b7215c',
  secret: '0443b24a05a9741cd8a6',
  cluster: 'ap2',
  encrypted: true
});

setInterval(() => {
  pusher.trigger('my-channel', 'notification', {
    newNotifications: [
      {
        id: Math.floor(Math.random() * 1000000),
        isRead: false,
        name: 'abs',
        message: 'lorem ipsums smfkshfk iusfhkejn skfsfkjle',
      },
    ],
  });
},
  6000,
);

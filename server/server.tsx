import React from 'react';
import express from 'express';
import ReactDOMServer from 'react-dom/server';
import { render } from 'nunjucks';
import path from 'path'
import { ServerLocation } from '@reach/router';
import { App } from '../src/App';
import webpack = require('webpack');
import middleware from 'webpack-dev-middleware';
import hotMiddleware from 'webpack-hot-middleware';
import config from '../build/webpack.config';
import isObject from 'is-object';

const app = express();
const compiler = webpack(config);

app.use(middleware(compiler, {
  publicPath: "/assets/",
  stats: 'errors-only',
  serverSideRender: true,
}))

app.use(hotMiddleware(compiler))

function normalizeAssets(assets: any) {
  if (isObject(assets)) {
    return Object.values(assets);
  }
  return Array.isArray(assets) ? assets : [assets];
}

app.use((req, res) => {
  const assetsByChunkName = res.locals.webpackStats.toJson().assetsByChunkName;
  const fs = res.locals.fs;
  const outputPath = res.locals.webpackStats.toJson().outputPath;
  // console.log(res.locals.webpackStats);
  const title = 'react-ssr-cli2'
  const js = normalizeAssets(assetsByChunkName.main)
    .filter((path) => path.endsWith('.js'))
    .map((path) => `<script src="/assets/${path}"></script>`)
    .join('\n');
  const css = normalizeAssets(assetsByChunkName.main)
    .filter((path) => path.endsWith('.css'))
    .map((path) => fs.readFileSync(outputPath + '/' + path))
    .join('\n');
  const content = ReactDOMServer.renderToString(
    <ServerLocation url={req.url}>
      <App />
    </ServerLocation>
  );
  const output = render(path.resolve(__dirname, '../src/index.html'), {
    title,
    content,
    js,
    css,
  });
  res.end(output);
})

app.get('/api', (req, res) => {
  res.end('haha api')
})

app.listen(3000);

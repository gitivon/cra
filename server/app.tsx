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

function normalizeAssets(assets: any) {
  if (isObject(assets)) {
    return Object.values(assets);
  }
  return Array.isArray(assets) ? assets : [assets];
}

export const app = (app: express.Application, server: any) => {
  app.get('/', (req, res) => {
    const assetsByChunkName = server._stats.toJson().assetsByChunkName;
    const fs = res.locals.fs;
    const outputPath = server._stats.toJson().outputPath;
    const title = 'react-ssr-cli-2'
    const js = normalizeAssets(assetsByChunkName.main)
      .filter((path) => path.endsWith('.js'))
      .map((path) => `<script src="/assets/${path}"></script>`)
      .join('\n');
    const styles = normalizeAssets(assetsByChunkName.main)
      .filter((path) => path.endsWith('.css'))
      .map((path) => fs.readFileSync(outputPath + '/' + path))
      .join('\n');
    const content = ReactDOMServer.renderToString(
      <ServerLocation url={req.url}>
        <App />
      </ServerLocation>
    );
    const output = render(path.resolve(__dirname, '../src/index.njk'), {
      title,
      content,
      js,
      styles,
    });
    res.end(output);
  })

  app.get('/api', (req, res) => {
    res.end('haha api')
  })
}
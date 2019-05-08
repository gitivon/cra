import React from 'react';
import express, { RequestHandler } from 'express';
import ReactDOMServer from 'react-dom/server';
import { render } from 'nunjucks';
import path from 'path';
import { ServerLocation } from '@reach/router';
import { App } from '../src/App';
import isObject from 'is-object';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';
import chalk from 'chalk';
function normalizeAssets(assets: any) {
  if (isObject(assets)) {
    return Object.values(assets);
  }
  return Array.isArray(assets) ? assets : [assets];
}

const sheet = new ServerStyleSheet();
export const app = (app: express.Application, server: any) => {
  const ssr: RequestHandler = (req, res) => {
    const assetsByChunkName = server._stats.toJson().assetsByChunkName;
    const title = 'react-ssr-cli-2';
    const js = normalizeAssets(assetsByChunkName.main)
      .filter(path => path.endsWith('.js'))
      .map(path => `<script src="/${path}"></script>`)
      .join('\n');
    console.log(
      chalk.greenBright(new Date().toLocaleString()),
      chalk.blueBright(req.method),
      chalk.yellow(req.url)
    );
    const content = ReactDOMServer.renderToString(
      <StyleSheetManager sheet={sheet.instance}>
        <ServerLocation url={req.url}>
          <App />
        </ServerLocation>
      </StyleSheetManager>
    );
    const styleTags = sheet.getStyleTags();
    const output = render(path.resolve(__dirname, '../src/index.njk'), {
      title,
      content,
      js,
      styleTags,
    });
    res.end(output);
  };
  app.get('/', ssr);
  app.get('/hello', ssr);

  app.get('/api', (req, res) => {
    res.end('haha api');
  });
};

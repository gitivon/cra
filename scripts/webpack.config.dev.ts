import webpack from 'webpack';
import middleware from 'webpack-dev-middleware'
import path from 'path';
import express from 'express'
import { compiler } from './webpack.config';
import nunjucks from 'nunjucks';

const app = express();

app.use(middleware(compiler, {
  publicPath: '/'
}));

app.get('/', (req, res) => {
  const params = {
    title: 'React Demo'
  }
  const body = nunjucks.render(path.resolve(__dirname, '../src/index.html'), params);
  res.end(body);
})

app.listen(3000, () => console.log('express server is running on portt: 3000'))


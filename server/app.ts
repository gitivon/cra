import express from 'express';

export const app = (app: express.Application) => {
  app.get('/api', (req, res) => {
    res.end('haha api')
  })
}
import Koa from 'koa';
import Router from 'koa-router';

const app = new Koa();
const router = new Router();

router.get('/', (ctx) => {
  console.log(ctx);
  ctx.body = '';
})

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000, () => {
  console.log('server is running on port 3000');
});

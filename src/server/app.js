import Koa from 'koa'
import { UserCtrl } from './users'

const app = new Koa();
const users = new UserCtrl();

app
  .use(users.router.routes())
  .listen(3000)
;

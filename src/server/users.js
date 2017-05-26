import { Router, Controller, GET, POST } from './router';

@Controller('/users')
export class UserCtrl extends Router
{
  @GET()
  async getHome(context)
  {
    console.log('home');
    context.body = 'Welcome home!';
    context.status = 200;
  }
}

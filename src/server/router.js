import Koa66 from 'koa-66';
import * as decorators from 'route-decorators';


export class Router
{
  constructor()
  {
    this.router = new Koa66();

    for(const { method, url, middleware, fnName } of this.$routes)
    {
      this.router[method](url, ...middleware, this[fnName].bind(this));
    }
  }
}

export const Controller = decorators.controller;

export const GET = decorators.get;
export const POST = decorators.post;

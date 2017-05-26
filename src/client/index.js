import StateRouter from 'abstract-state-router';
import sausage from 'sausage-router';
import makeRouter from 'hash-brown-router';
import SvelteRenderer from 'svelte-state-renderer';

import AppRoute from './app/app.route';

const stateRouter = StateRouter
(
  SvelteRenderer(),
  document.querySelector('app'),
  {
    pathPrefix: '',
    router: makeRouter(sausage())
  }
);

stateRouter.setMaxListeners(20);

AppRoute(stateRouter);

stateRouter.evaluateCurrentRoute('app');

import StateRouter from 'abstract-state-router';
// import sausage from 'sausage-router';
// import makeRouter from 'hash-brown-router';
import SvelteRenderer from 'svelte-state-renderer';

export const stateRouter = StateRouter
(
  SvelteRenderer(),
  document.querySelector('app'),
  // {
  //   pathPrefix: '',
  //   router: makeRouter(sausage())
  // }
  // TODO issue with SW cache / offline mode and nginx needs to be configured
);

stateRouter.setMaxListeners(20);

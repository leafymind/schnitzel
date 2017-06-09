import { stateRouter } from './app/shared/Router';
import AppRoute from './app/app.route';

AppRoute(stateRouter);

stateRouter.evaluateCurrentRoute('app');

if (process.env.ENV === 'production')
{
  require('offline-plugin/runtime').install();
}

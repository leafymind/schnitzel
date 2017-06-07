import DB from '../../shared/DB.js';
import Login from './login.svelte';

export default function(stateRouter)
{
  stateRouter.addState
  ({
    name: 'app.login',
    route: '/login',
    template: Login,
    resolve(data, params)
    {
      return DB.remote.challenges.getSession()
        .catch(console.error.bind())
        .then(session =>
        {
          if (session.userCtx.name !== null)
          {
            throw { redirectTo: { name: 'app.overview', replace: true } };
          }

          return params;
        })
      ;
    }
  });
}

import DB from '../../../shared/DB';
import ChallengeCreate from './challenge-create.svelte';

export default function(stateRouter)
{
  stateRouter.addState
  ({
    name: 'app.create',
    route: '/new',
    template: ChallengeCreate,
    resolve()
    {
      return DB.remote.challenges.getSession()
        .then(session =>
        {
          if (session.userCtx.name === null)
          {
            throw {
              redirectTo:
              {
                name: 'app.login',
                replace: true,
                params: { returnTo: 'app.create' }
              }
            };
          }
          else if (!session.userCtx.roles.includes('creator'))
          {
            throw {
              redirectTo:
              {
                name: 'app.overview',
                replace: true,
                params: { error: 'no-creator' }
              }
            };
          }
        })
      ;
    }
  });
}
